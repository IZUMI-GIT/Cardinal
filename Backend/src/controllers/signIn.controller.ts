import { NextFunction, Request, Response } from "express";
import { signInService } from "../services/signIn.service";
import { AppError } from "../utils/AppError";
import { setAuthCookies } from "../helpers/setAuthCookies";

export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password}:{
            email: string,
            password: string
        } = req.body;

        const userAgent: string = req.headers['user-agent']!;
        const userIP: string = req.ip!;
        const details = {
            email,
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
        return res.status(200).json({ message, access_token, user });
    }catch(e){
        return next(new AppError("Not Signed In", 500))
    }
}