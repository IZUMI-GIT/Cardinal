import * as z from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
interface SignUp {
    name: string,
    email: string,
    password: string,
    username: string,
    userAgent: string,
    userIP: string
}

const SECRET_KEY = config.SECRET_KEY;
// const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET; 

export const signupService = async (details : SignUp)  => {
    // console.log("Entered here")

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
        return {statusCode : 400, message : "enter details correctly"}
    }
    else{
        const emailCheck = await prisma.user.findUnique({
            where : {
                email : details.email
            }
        })

        if(emailCheck){
            return {statusCode : 409, message : "user already exists"}
        }else{
            try{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(details.password, salt);

                const newUser = await prisma.user.create({
                    data : {
                        email : details.email,
                        hashedPassword,
                        name : details.name,
                        userName : details.username
                    }
                })

                const jwToken = jwt.sign({
                    email: newUser.email,
                    role: newUser.role,
                    id: newUser.id
                }, SECRET_KEY)

                const refreshToken = uuidv4();
                const d = new Date();
                d.setDate(d.getDate() + 7);

                await prisma.session.create({
                    data: {
                        userId: newUser.id,
                        refreshToken,
                        userAgent: details.userAgent,
                        expiredAt: d,
                        ipAddress: details.userIP
                    }
                })

                return {
                    statusCode : 201,
                    message: "user created successfully",
                    user: newUser,
                    access_token: jwToken,
                    refresh_token: refreshToken
                }

                //JWT token assignment in SignIn controller/service file

                // const jwToken = jwt.sign({
                //     email : newUser.email,
                //     role : newUser.role,
                //     id : newUser.id
                //     }, SECRET_KEY as string
                // )

                // const refreshToken = jwt.sign({
                //     email : newUser.email,
                //     role : newUser.role,
                //     id : newUser.id
                //     }, REFRESH_TOKEN_SECRET as string
                // )

                // return {
                //     statusCode: 201,
                //     message: "User created successfully",
                //     access_token : jwToken,
                //     refresh_token : refreshToken,
                //     user: newUser
                // }

            }catch{
                return {statusCode: 500, message : "SignUp Internal Error"}
            }
        }
    }

}


export const usernameService = async (userId: number, email: string, username: string) => {

    const usernameSchema = z.object({
        userId: z.number(),
        email: z.email(),
        username: z.string()
    })

    const schemaResponse = usernameSchema.safeParse({
        userId,
        email,
        username
    })

    if(!schemaResponse.success){
        return {statusCode: 404, message: "Invalid username"};
    }
    const IdCheck = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!IdCheck){
        return {statusCode: 400, message: "enter correct email"}
    }

    try{
        const newUsername = await prisma.user.update({
            where: {
                email
            },
            data: {
                userName : username
            }
        })

        return{
            statusCode: 201,
            message: `username created: ${newUsername.userName}`
        }
    }catch{
        return {statusCode: 500, message: "Internal error"}
    }
}