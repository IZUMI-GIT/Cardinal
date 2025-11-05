import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../../config/config";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import crypto from "crypto";

const SECRET_KEY = config.SECRET_KEY;
// const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

interface SignIn {
    email: string,
    password: string,
    userAgent: string,
    userIP : string
}

export const signInService = async ({email, password, userAgent, userIP}: SignIn) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            name: true,
            userName: true,
            role: true,
            hashedPassword: true
        }
    })

    if(!user){
        throw new AppError("Invalid credentials", 401);
    }else{
        try{
            const hashPassword = user.hashedPassword;
            const hashVerify = await bcrypt.compare(password, hashPassword);
            // console.log("hashverify :", hashVerify)
            if(!hashVerify){
                throw new AppError("Invalid credentials", 401);
            }else{
                const jwToken = jwt.sign({
                    email,
                    role : user.role,
                    id : user.id
                    }, SECRET_KEY as string,
                    { expiresIn: "15m" }
                )

                const refreshToken = crypto.randomBytes(40).toString('hex');
                const hashRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex')
                const d = new Date();
                d.setDate(d.getDate() + 7)

                // const response = 
                await prisma.session.create({
                    data: {
                        userId: user.id,
                        refreshToken: hashRefreshToken,
                        userAgent,
                        expiredAt: d,
                        ipAddress: userIP
                    }
                })

                // console.log("uuid: ", response)

                // const refreshToken = jwt.sign({
                //     email,
                //     role : user.role,
                //     id : user.id
                //     }, REFRESH_TOKEN_SECRET as string
                // )

                const userDto = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userName: user.userName,
                    role: user.role,
                };

                return {
                    access_token : jwToken,
                    refresh_token : refreshToken,
                    user: userDto,
                }
            }
        }catch(err){
            throw new AppError("Sign-In failed", 500);
        }
    }
}