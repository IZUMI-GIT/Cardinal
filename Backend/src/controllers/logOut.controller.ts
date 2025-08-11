import { NextFunction, Request, Response } from "express";
import { logoutService } from "../services/logout.service";
import { AppError } from "../utils/AppError";

export const postLogout = async (req: Request, res: Response, next : NextFunction) => {

    const accessToken : string = req.cookies.access_token;
    const refreshToken : string = req.cookies.refresh_token;

    const logoutResponse = await logoutService(accessToken, refreshToken);

    console.log(logoutResponse)
    if(!logoutResponse){
        return next(new AppError("token logout failed", 501))
    }
    if(logoutResponse.status === 500){
        res.clearCookie(accessToken)
        res.clearCookie(refreshToken)
    }else{
        return next(new AppError(logoutResponse.message, 500))
    }

}