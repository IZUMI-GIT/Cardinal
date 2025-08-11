import { NextFunction, Request, Response } from "express";
import { logoutService } from "../services/logout.service";
import { AppError } from "../utils/AppError";

export const postLogout = async (req: Request, res: Response, next : NextFunction) => {

    const accessToken : string = req.cookies.accessToken;
    const refreshToken : string = req.cookies.refreshToken;

    const logoutResponse = await logoutService(accessToken, refreshToken);

    if(!logoutResponse){
        return next(new AppError("token logout failed", 501))
    }
    if(logoutResponse.statusCode === 200){
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        return res.status(logoutResponse.statusCode).json({
            message: "cleared cookies"
        })
    }else{
        return next(new AppError(logoutResponse.message, logoutResponse.statusCode))
    }

}