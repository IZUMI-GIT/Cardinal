import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const prisma = new PrismaClient();
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

interface SignIn {
    email: string,
    password: string
}

export const signInService = async ({email, password}: SignIn) => {

    if(!SECRET_KEY || !REFRESH_TOKEN_SECRET){
        return {status: 401, message: "Keys corrupted"}
    }

    const loginSchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    })

    const zodResult = loginSchema.safeParse({email, password});

    if(!zodResult.success){
        return {status: 400, message : "enter details correctly"}
    }else{
        const emailCheck = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!emailCheck){
            return {status: 409, message: "user already exists"}
        }else{
            try{
                const hashPassword = emailCheck.hashedPassword;
                const hashVerify = await bcrypt.compare(password, hashPassword);

                if(hashVerify){
                    const jwToken = jwt.sign({
                        email,
                        role : emailCheck.role,
                        id : emailCheck.id
                        }, SECRET_KEY as string
                    )

                    const refreshToken = jwt.sign({
                        email,
                        role : emailCheck.role,
                        id : emailCheck.id
                        }, REFRESH_TOKEN_SECRET as string
                    )

                    return {
                        status: 201,
                        message: "User created successfully",
                        access_token : jwToken,
                        refresh_token : refreshToken,
                        user: emailCheck
                    }
                }
            }catch(e){
                return {status: 500, message: "Internal Error"}
            }
        }

    }
}