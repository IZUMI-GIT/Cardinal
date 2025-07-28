import { NextFunction, Request, Response } from "express";
import { signInService } from "../services/signIn.service";
import { AppError } from "../utils/AppError";

// interface SignInSuccessResponse {
//     status: 201;
//     message: string;
//     access_token: string;
//     refresh_token: string;
//     user: any;
//     }

//     interface SignInErrorResponse {
//     status: number;
//     message: string;
//     }

//     type SignInResponse = SignInSuccessResponse | SignInErrorResponse;

export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {

    const {email, password}:{
        email: string,
        password: string
    } = req.body;

    const details = {
        email,
        password
    }

    const signInResponse = await signInService(details);

    if(!signInResponse){
        return next(new AppError("Sign-In service failed to respond", 501))
    }
    if(signInResponse.status === 201){
    
            // Assuming the token and user are returned in the response
            const { access_token, refresh_token, status, message, user } = signInResponse;
            // Set the token in the response header
            res.cookie('accessToken', access_token, {
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production,
                maxAge : 15*60*1000    //15 minutes
            })
    
            res.cookie('refreshToken', refresh_token, {
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge : 7*24*60*60*1000    //7 days
            })
    
            return res.status(status).json({
                message,
                access_token,
                user
            })
        }else{
            // return res.status(signInResponse.status).json({
            //     message : signInResponse.message
            // })
    
            return next(new AppError(signInResponse.message, signInResponse.status))
        }

}