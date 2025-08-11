import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../config/config";
import {v4 as uuidv4} from 'uuid';
const prisma = new PrismaClient();

const SECRET_KEY = config.SECRET_KEY;
// const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

interface SignIn {
    email: string,
    password: string,
    userAgent: string,
    userIP : string
}

export const signInService = async ({email, password, userAgent, userIP}: SignIn) => {

    const loginSchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    })

    const zodResult = loginSchema.safeParse({email, password});
    // console.log("zodResult :", zodResult)

    if(!zodResult.success){
        return {statusCode: 400, message : "enter details correctly"}
    }else{
        const emailCheck = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // console.log("emailCheck :", emailCheck)

        if(!emailCheck){
            return {statusCode: 409, message: "user doesn't exist"}
        }else{
            try{
                const hashPassword = emailCheck.hashedPassword;
                const hashVerify = await bcrypt.compare(password, hashPassword);
                // console.log("hashverify :", hashVerify)
                if(hashVerify){
                    const jwToken = jwt.sign({
                        email,
                        role : emailCheck.role,
                        id : emailCheck.id
                        }, SECRET_KEY as string
                    )

                    const refreshToken = uuidv4();
                    const d = new Date();
                    d.setDate(d.getDate() + 7)

                    const response = await prisma.session.create({
                        data: {
                            userId: emailCheck.id,
                            refreshToken,
                            userAgent,
                            expiredAt: d,
                            ipAddress: userIP
                        }
                    })

                    // console.log("uuid: ", response)

                    // const refreshToken = jwt.sign({
                    //     email,
                    //     role : emailCheck.role,
                    //     id : emailCheck.id
                    //     }, REFRESH_TOKEN_SECRET as string
                    // )

                    return {
                        statusCode: 201,
                        message: "User created successfully",
                        access_token : jwToken,
                        refresh_token : refreshToken,
                        user: emailCheck
                    }
                }else{
                    return {statusCode: 400, message: "enter correct credentials"}
                }
            }catch(e){
                return {statusCode: 500, message: "Internal Error"}
            }
        }

    }
}