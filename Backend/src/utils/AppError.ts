
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        // super(statusCode)
        this.name = "AppError";
        this.statusCode = statusCode || 500;
        this.isOperational = true;
        // console.log("statusCode AppError:", statusCode)

        Error.captureStackTrace(this, this.constructor) //preserves where the error came from
    }
}