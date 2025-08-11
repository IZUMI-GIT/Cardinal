import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

export type DecodedToken = {
    email: string,
    role : 'USER' | 'ADMIN',
    id : number
}

const SECRET_KEY = config.SECRET_KEY;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try{
        const access_token = req.cookies.access_token;
        if(!access_token) return next(new AppError('access token missing', 401));

        let decoded = jwt.verify(access_token, SECRET_KEY) as JwtPayload;
        req.body.userId = decoded.id;
        console.log(decoded)
        return next();
    } catch(err: unknown){
        if(err instanceof Error){
            next(new AppError(err.message, 500))
        }else{
            next(new AppError("Unknown error occured", 500))
        }
    }
}