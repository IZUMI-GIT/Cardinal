import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";

const SECRET_KEY = config.SECRET_KEY;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const access_token = req.cookies.access_token;

    if(!access_token){
        next(new AppError('config error', 500))
        return
    }

    jwt.verify(access_token, SECRET_KEY, (err: any, decoded: any) => {
        if(err){
            console.error('JWT verification failed :', err.message)
            if(err.name === 'TokenExpiredError'){
                console.error('Token Expired at:', err.expiredAt)
            }
            next(new AppError(err.message, 401))
            return
        }else{
            console.log('JWT successfully verified. Decoded JWTpayload :', decoded)
            req.user = decoded;
            next();
            return
        }
    })
}