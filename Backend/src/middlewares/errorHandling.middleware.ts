import { NextFunction, Request, Response } from "express";

type ErrorType = {
    status : number,
    message : string
}

export const errorHandler = (err : ErrorType, req : Request, res : Response, next : NextFunction) => {
    
    let statusCode = !err.status ? 500 : err.status;
    let message = !err.message ? 'An unexpected error occured' : err.message;
    
    res.status(statusCode).json({
        status : statusCode,
        message : message
    })
    
}