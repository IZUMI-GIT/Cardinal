import { NextFunction, Request, Response } from "express";
import { signupService, usernameService } from "../../services/auth/signUp.service";
import { AppError } from "../../utils/AppError";
import { setAuthCookies } from "../../helpers/setAuthCookies";


export const postSignup = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const {name, email, password, username} : {
        name : string,
        email : string,
        password : string,
        username : string
    } = req.body;
    
    const userAgent: string = req.headers['user-agent']!;
    const userIP: string = req.ip!;

    const details = {
        name,
        email,
        password,
        username,
        userAgent,
        userIP
    }


    const signupResponse = await signupService(details);

    if(!signupResponse){
            return next(new AppError("Sign-In service failed to respond", 501))
    }

    if(signupResponse.statusCode !== 201){
        return next(new AppError(signupResponse.message, signupResponse.statusCode))
    }

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
        

        const { access_token, refresh_token, message, user } = signupResponse;
        
            if(!access_token || !refresh_token){
                return next(new AppError("token missing", 500))
            }
            
            const tokens = {
                access_token,
                refresh_token
            }
    
            await setAuthCookies(res, tokens)
            return res.status(200).json({ message, access_token, user });
        }
    catch{
            return next(new AppError("Not signedup", 500))
        }
}


export const getUsername = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const username: string = req.params.username;

        const usernameResponse = await usernameService(username);

        // if(usernameResponse.statusCode !== 204){
        //     return next( new AppError(usernameResponse.message, usernameResponse.statusCode))
        // }

        return res.status(usernameResponse.statusCode).json({
            message : usernameResponse.message,
            exists: usernameResponse.exists
        })
    }catch{
        return next(new AppError("Username internal error", 500))

    }
}