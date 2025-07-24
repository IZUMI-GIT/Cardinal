import * as z from "zod";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
interface SignUp {
    name: string,
    email: string,
    password: string,
    username: string
}

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const signupService = async (details : SignUp)  => {
    const emailCheck = await prisma.user.findUnique({
        where : {
            email : details.email
        }
    })

    if(emailCheck){
        return {status : 409, message : "user already exists"}
    }
    else{
        const signupSchema = z.object({
        email : z.email(),
        password : z.string().min(6),
        name : z.string(),
        username : z.string()
        })

        const result = signupSchema.safeParse({
            email : details.email,
            password : details.password,
            name : details.name,
            username : details.username
        });

        if(!result.success){
            return {status : 401, message : "enter details correctly"}
        }else{
            try{
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(details.password, salt);

                const newUser = await prisma.user.create({
                    data : {
                        email : details.email,
                        hashedPassword,
                        name : details.name,
                        userName : details.username
                    }
                })

                const jwToken = jwt.sign({
                    email : newUser.email,
                    role : newUser.role,
                    id : newUser.id
                    }, SECRET_KEY as string
                )

                const refreshToken = jwt.sign({
                    email : newUser.email,
                    role : newUser.role,
                    id : newUser.id
                    }, REFRESH_TOKEN_SECRET as string
                )

                return {
                    status: 201,
                    message: "User created successfully",
                    access_token : jwToken,
                    refresh_token : refreshToken,
                    user: newUser
                }
                
            }catch(e){
                return {status: 500, message : "Internal Error"}
            }
        }
    }

}