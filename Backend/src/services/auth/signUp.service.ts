import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from '../../config/config';
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

export const signupService = async (details: SignUp)  => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(details.password, salt);

    const refreshToken = uuidv4();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email : details.email.toLowerCase(),
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
            // expiredAt: expiryDate,
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