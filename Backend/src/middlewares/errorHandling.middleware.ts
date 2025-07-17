import { NextFunction, Request, Response } from "express";

type ErrorType = {
    status : number,
    message : string
}

export const errorHandler = (err : ErrorType, req : Request, res : Response, next : NextFunction) => {
    
    let statusCode = !err.status ? 500 : err.status;
    let message = !err.message ? '<h1>An unexpected error occured</h1>' : err.message;
    
    res.status(statusCode).send(message)
    
}