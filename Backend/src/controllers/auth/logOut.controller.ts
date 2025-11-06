import { NextFunction, Request, Response } from "express";
import { logoutService } from "../../services/auth/logout.service";
import { AppError } from "../../utils/AppError";

export const postLogout = async (req: Request, res: Response, next : NextFunction) => {

    try{
        const accessToken: string = req.cookies.accessToken;
        const refreshToken: string = req.cookies.refreshToken;

        if(!accessToken || !refreshToken){
            return next(new AppError("tokens not available", 500))
        }

        const logoutResponse = await logoutService(accessToken, refreshToken);

        if(!logoutResponse){
            return next(new AppError("token logout failed", 501))
        }

        return res.status(200).json({
            message: "cleared cookies"
        })
    }catch(e){
        return next(e)
    }
}