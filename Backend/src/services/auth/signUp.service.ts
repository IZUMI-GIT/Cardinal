import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from '../../config/config';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../../utils/AppError";
import prisma from "../../lib/prisma";
import crypto from "crypto";

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

export const signupService = async (details: SignUp)  => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(details.password, salt);

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    try{
        const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email : details.email.trim().toLowerCase(),
                hashedPassword,
                name : details.name,
                userName : details.username   
            },
            select:{
                id: true,
                email: true,
                name: true,
                userName: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        
        const accessToken = jwt.sign(
            {
            email: newUser.email,
            role: newUser.role,
            id: newUser.id
            }, 
            SECRET_KEY,
            { expiresIn: "15m"}
        )

        await tx.session.create({
            data: {
                userId: newUser.id,
                refreshToken: hashedRefreshToken,
                userAgent: details.userAgent,
                expiredAt: expiryDate,
                ipAddress: details.userIP
            }
        })
    

        return { newUser, accessToken }

        })

    
        return {
            message: "user created successfully",
            user: result.newUser,
            access_token: result.accessToken,
            refresh_token: refreshToken
        }
    }catch(err: unknown){
        const maybePrisma = err as { code?: string, meta?: { target?: string[] } };
        if(maybePrisma.code === 'P2002' && maybePrisma.meta?.target?.includes('email')){
            throw new AppError('Email already in use', 409);
        }

        throw new AppError('Internal Server Error', 500);
    }

    /**JWT token assignment in SignIn controller/service file

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
        statusCode: 201,
        message: "User created successfully",
        access_token : jwToken,
        refresh_token : refreshToken,
        user: newUser
    }
        **/
}