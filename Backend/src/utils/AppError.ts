
export class AppError extends Error {
    [x: string]: any;
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode | 500;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor) //preserves where the error came from
    }
}