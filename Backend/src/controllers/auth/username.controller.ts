import { NextFunction, Request, Response } from "express";
import { usernameService } from "../../services/auth/username.service";
import { AppError } from "../../utils/AppError";

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