import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = config.SECRET_KEY;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try{
        const access_token = req.cookies.accessToken;
        // const refresh_token = req.cookies.refreshToken;

        if(!access_token) return next(new AppError('access token missing', 401));

        const decoded = jwt.verify(access_token, SECRET_KEY) as JwtPayload;
        // req.body.userId = decoded.id;
        req.userId = decoded.id;
        
        return next();
    } catch(err: unknown){
        if(err instanceof Error){
            next(new AppError(err.message, 500))
        }else{
            next(new AppError("Unknown error occured", 500))
        }
    }
}