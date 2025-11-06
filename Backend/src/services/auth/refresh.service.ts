import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import {v4 as uuidv4} from 'uuid';
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import crypto from "crypto"

const SECRET_KEY = config.SECRET_KEY;

export const refreshService = async (token: string, userAgent: string, userIP: string) => {

    const hashed: string = crypto.createHash('sha256').update(token).digest('hex');
    const response = await prisma.session.findUnique({
        where: {
            refreshToken: hashed
        }
    })

    if(!response){
        throw new AppError("no session recorded", 401)
    }else{
        try{
            const accessToken = jwt.sign(response, SECRET_KEY as string);
            const refreshToken = crypto.randomBytes(40).toString('hex');
            const hashedRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);

            await prisma.$transaction(async (tx) => {
                await tx.session.update({
                    where: {
                        refreshToken: hashed
                    },
                    data: {
                        valid: false
                    }
                })

                await tx.session.create({
                    data: {
                        userId: response.userId,
                        refreshToken: hashedRefreshToken,
                        userAgent: userAgent,
                        ipAddress: userIP,
                        expiredAt: expiryDate
                    }
                })

            })

            return {
                message: "session created",
                userId: response.userId,
                accessToken,
                refreshToken
            }
        }catch(err){
            throw new AppError(`: ${err}`, 501)
        }
    }
}