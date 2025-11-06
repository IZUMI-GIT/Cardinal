import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../../utils/AppError";
import { signupService } from "../../services/auth/signUp.service";
import { setAuthCookies } from "../../helpers/setAuthCookies";

const signupSchema = z.object({
    email : z.email(),
    password : z.string().min(6),
    name : z.string(),
    username : z.string()
})

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const parsed = signupSchema.safeParse(req.body);
        if(!parsed.success){
            return next(new AppError(`Validation Error: ${z.treeifyError(parsed.error)}`, 400,))
        }
        
        const {name, email, password, username} = parsed.data;
        const normalizedEmail = String(email).trim().toLowerCase();
        
        const userAgent = req.headers['user-agent'] ?? "unknown";
        let userIP: string
        const ipForwarded = req.headers['x-forwarded-for'];
        if(typeof ipForwarded === 'string'){
            userIP = ipForwarded.split(',')[0].trim();
        }else if(Array.isArray(ipForwarded)){
            userIP = ipForwarded[0]
        }else{
            userIP = req.socket.remoteAddress || 'undefined';
        }
        
        const details = {
            name,
            email: normalizedEmail,
            password,
            username,
            userAgent,
            userIP
        }

        const signupResponse = await signupService(details);
        const { access_token, refresh_token, message, user } = signupResponse;

        if(!access_token || !refresh_token){
            return next(new AppError("token generation failed", 500))
        }
        
        const tokens = {
            access_token,
            refresh_token
        }

        await setAuthCookies(res, tokens)
        res.setHeader('Location', `/users/${user.id}`);
        return res.status(201).json({ message, access_token, user });

        // Assuming the token and user are returned in the response
        // const { access_token, refresh_token, statusCode, message, user } = signupResponse;
        // // Set the token in the response header
        // res.cookie('accessToken', access_token, {
        //     sameSite: 'lax',
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production,
        //     maxAge : 15*60*1000    //15 minutes
        // })

        // res.cookie('refreshToken', refresh_token, {
        //     sameSite: 'lax',
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge : 7*24*60*60*1000    //7 days
        // } )
    }
    catch(err){
        // return next(err instanceof AppError ? err : new AppError(err?.message ?? "Signup failed", err?.statusCode ?? 500));    
        return next(err)
    }
}