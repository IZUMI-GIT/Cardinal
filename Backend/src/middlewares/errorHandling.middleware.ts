import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

// type ErrorType = {
//     status : number,
//     message : string
// }

export const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    
    const isAppError = err instanceof AppError;
    let statusCode : number = isAppError ? err.statusCode : 500;
    let message : string =isAppError ? err.message : 'An unexpected error occured';
    
    // if(process.env.NODE_ENV !== 'production'){
    //     console.error(err.stack)
    // }

    console.log("---------Error types--------")
    console.log(typeof err);
    console.log(err)
    console.log(Object.keys(err))
    console.log(err.statusCode)
    console.log(err.isOperational);
    console.log(err.message)
    console.log(err.name)
    console.log("*****END*****")

    res.status(statusCode).json({message})
    
}