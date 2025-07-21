import { NextFunction, Request, Response } from "express";
import { signupService } from "../services/auth.service";

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password, username} : {
        name : string,
        email : string,
        password : string,
        username : string
    } = req.body;

    const details = {
        name,
        email,
        password,
        username
    }

    const signupResponse = await signupService(details);

    
}