import { NextFunction, Request, Response } from "express";
import { refreshService } from "../services/refresh.service";
import { AppError } from "../utils/AppError";
import { setAuthCookies } from "../helpers/setAuthCookies";

export const postRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    
    const refreshToken : string = req.cookies.refreshToken;
    //fetch user-Agent => not implemented
    let userAgent : string | undefined =  req.headers["user-agent"]
    if(!userAgent){
        userAgent = "default agent"
    }
    console.log("refreshToken:", refreshToken)

    if(!refreshToken){
        return next(new AppError("no refresh token", 401))
    }else{
        try{
            const refreshResponse = await refreshService(refreshToken, userAgent);
            if(refreshResponse.statusCode === 200){
        
                // Assuming the token and user are returned in the response
                const { access_token, refresh_token, statusCode, message } = refreshResponse;
                // Set the token in the response header

                if(!access_token || !refresh_token){
                    return next(new AppError("token missing", 500))
                }

                const tokens = {
                    access_token,
                    refresh_token
                }

                await setAuthCookies(res, tokens)
        
                return res.status(statusCode).json({
                    message
                })
            }else{
                // return res.status(refreshResponse.statusCode).json({
                //     message : refreshResponse.message
                // })
        
                return next(new AppError(refreshResponse.message, refreshResponse.statusCode))
            }   
        }catch(err: unknown){
            console.error(err);
            return next(new AppError("refresh token failed", 401))
        }

    }
    
}