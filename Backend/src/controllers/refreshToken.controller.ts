import { NextFunction, Request, Response } from "express";
import { refreshService } from "../services/refresh.service";
import { AppError } from "../utils/AppError";

export const postRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    
    const refreshToken : string = req.cookies.refreshToken;
    //fetch user-Agent => not implemented
    let userAgent : string | undefined =  req.headers["user-agent"]
    if(!userAgent){
        userAgent = "default agent"
    }
    console.log("refreshToken:", refreshToken)
    const refreshResponse = await refreshService(refreshToken, userAgent);

    if(refreshResponse.statusCode === 201){
    
            // Assuming the token and user are returned in the response
            const { access_token, refresh_token, statusCode, message } = refreshResponse;
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
            } )
    
            return res.status(statusCode).json({
                message,
                access_token
            })
        }else{
            // return res.status(refreshResponse.statusCode).json({
            //     message : refreshResponse.message
            // })
    
            return next(new AppError(refreshResponse.message, refreshResponse.statusCode))
        }
}