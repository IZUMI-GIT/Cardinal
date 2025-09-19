import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

// type ErrorType = {
//     status : number,
//     message : string
// }

export const errorHandler = (err : unknown, req : Request, res : Response, next: NextFunction) => {
    
    // const isAppError = err instanceof AppError;
    // const statusCode : number = isAppError ? err.statusCode : 500;
    // const message : string =isAppError ? err.message : 'An unexpected error occured';
    
    // // if(process.env.NODE_ENV !== 'production'){
    // //     console.error(err.stack)
    // // }

    // console.log("---------Error types--------")
    // console.log(typeof err);
    // console.log(err)
    // console.log(Object.keys(err as any))
    // console.log(statusCode)
    // console.log((err as any).isOperational);
    // console.log(message)
    // console.log((err as any).name)
    // console.log("*****END*****")

    // res.status(statusCode).json({message})


    if(err instanceof AppError){
        const statusCode = err.statusCode ?? 500;
        const message = err.message ?? "An unexpected error occurred";
        // optional: use any AppError-specific fields safely here
        console.log("---------AppError--------");
        console.log({ name: err.name, isOperational: err.isOperational, statusCode, message });
        console.log("*****END*****")
        return res.status(statusCode).json({ message });
    }
    
    if(err instanceof Error){
        const message = err.message || "An unexpected error occurred";
        console.log("---------Error--------");
        console.log({ name: err.name, message });
        return res.status(500).json({ message });
    }

      // Unknown non-error value (fallback)
  console.log("---------Unknown error type--------");
  // If you still want keys of a non-object, guard first:
    if (typeof err === "object" && err !== null) {
        console.log("Keys:", Object.keys(err as Record<string, unknown>));
    } else {
        console.log("Value:", err);
    }

    return res.status(500).json({ message: "An unexpected error occurred" });
}