import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

// type ErrorType = {
//     status : number,
//     message : string
// }

export const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    
    const isAppError = err instanceof AppError;
    let statusCode = isAppError ? err.status : 500;
    let message =isAppError ? err.message : 'An unexpected error occured';
    
    // if(process.env.NODE_ENV !== 'production'){
    //     console.error(err.stack)
    // }


    res.status(statusCode).json({message})
    
}