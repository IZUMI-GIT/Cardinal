import { NextFunction, Request, Response } from "express";
import { signInService } from "../../services/auth/signIn.service";
import { AppError } from "../../utils/AppError";
import { setAuthCookies } from "../../helpers/setAuthCookies";
import z from "zod";

const signInSchema =  z.object({
    email: z.email(),
    password: z.string().min(8)
})


export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const signinParsed = signInSchema.safeParse(req.body);
        if(!signinParsed.success){
            return next(new AppError(`Validation error: ${z.treeifyError(signinParsed.error)}`, 400))
        }

        const {email, password} = signinParsed.data;

        const userAgent: string = req.headers['user-agent'] || "user-agent-unknown";
        let userIP: string;
        const ipForwarded =  req.headers['x-forwarded-for']
        if(typeof ipForwarded === 'string'){
            userIP = ipForwarded.split(',')[0].trim();
        }else if(Array.isArray(ipForwarded)){
            userIP = ipForwarded[0];
        }else{
            userIP = req.socket.remoteAddress || 'undefined';
        }
        // const userIP: string = (req.headers['x-forwarded-for'] as string).split(',')[0] || req.socket.remoteAddress || "0.0.0.0";

        const normalizedEmail = String(email).trim().toLowerCase();
        const details = {
            email: normalizedEmail,
            password,
            userAgent,
            userIP
        }

        const signInResponse = await signInService(details);

        if(!signInResponse){
            return next(new AppError("Sign-In service failed to respond", 501))
        }
        if(signInResponse.statusCode !== 200){
            return next(new AppError(signInResponse.message, signInResponse.statusCode))
        }
        
        // Assuming the token and user are returned in the response
        const { access_token, refresh_token, message, user } = signInResponse;

        if(!access_token || !refresh_token){
            return next(new AppError("token missing", 500))
        }
        
        const tokens = {
            access_token,
            refresh_token
        }

        await setAuthCookies(res, tokens)
        return res.status(200).json({ message, user });

    }catch{
        return next(new AppError("Not Signed In", 500))
    }
}