import { NextFunction, Request, Response } from "express";
import { signupService } from "../services/signUp.service";
import { AppError } from "../utils/AppError";

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password, username} : {
        name : string,
        email : string,
        password : string,
        username : string
    } = req.body;

    const details = {
        name,
        email,
        password,
        username
    }

    const signupResponse = await signupService(details);
    console.log("signupResponse :" , signupResponse.statusCode)

    if(signupResponse.statusCode === 201){

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

        return res.status(signupResponse.statusCode).json({
            message : signupResponse.message,
            user : signupResponse.newUser
        })
        
    }else{
        // return res.status(signupResponse.statusCode).json({
        //     message : signupResponse.message
        // })

        return next(new AppError(signupResponse.message, signupResponse.statusCode))
    }
}