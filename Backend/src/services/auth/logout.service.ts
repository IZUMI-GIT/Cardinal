// import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../../config/config";
import prisma from '../../lib/prisma';
import crypto from "crypto";
import { AppError } from '../../utils/AppError';

const SECRET_KEY = config.SECRET_KEY;

export const logoutService = async (accessToken: string, refreshToken: string) => {

    try {
        const hashed = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const response = await prisma.session.findUnique({
            where: {
                refreshToken: hashed
            }
        })

        if(!response){
            throw new AppError("Invalid credentials", 401)
        }

        // const jwtResponse = jwt.verify(accessToken, SECRET_KEY) as JwtPayload;
        // const sessionRefreshResponse = 
        await prisma.session.update({
            where: {
                refreshToken: hashed
            }, 
            data : {
                valid : false
            }
        })
        // console.log("sessionRefreshResponse:", sessionRefreshResponse)
        return {
            message: "session logged out"
        }
    }catch(err){
        // console.log(e)
        throw new AppError((err as string), 500)
    }
}