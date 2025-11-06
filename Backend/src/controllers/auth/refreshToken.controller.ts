import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { refreshService } from "../../services/auth/refresh.service";
import { setAuthCookies } from "../../helpers/setAuthCookies";


export const postRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    
    try{
        const refresh_Token: string = req.cookies.refreshToken;
        //fetch user-Agent => not implemented
        let userAgent: string =  req.headers["user-agent"] ?? "unknown"
        let userIP: string;
        const ipForwarded = req.headers['x-forwarded-for'];

        if(typeof ipForwarded ===  'string'){
            userIP = ipForwarded.split(',')[0].trim();
        }else if(Array.isArray(ipForwarded)){
            userIP = ipForwarded[0];
        }else{
            userIP = req.socket.remoteAddress || 'undefined';
        }

        if(!refresh_Token){
            return next(new AppError("no refresh token", 401))
        }
        
        const refreshResponse = await refreshService(refresh_Token, userAgent, userIP);
        
        // Assuming the token and user are returned in the response
        const { accessToken, refreshToken, userId, message } = refreshResponse;
        // Set the token in the response header

        if(!accessToken || !refreshToken){
            return next(new AppError("token missing", 500))
        }

        const tokens = {
            access_token: accessToken,
            refresh_token: refreshToken
        }

        await setAuthCookies(res, tokens)
        // res.setHeader('Location', `/users/${user.id}`);
        // return res.status(201).json({ message, access_token, user });
    }catch(err){
        return next(err)
    }
}