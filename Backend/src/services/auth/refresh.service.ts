import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

const SECRET_KEY = config.SECRET_KEY;
// const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET

export const refreshService = async (token : string, userAgent : string) => {

    // console.log("token:", token)
    if(!SECRET_KEY){
        return {statusCode: 401, message: "Key corrupted"};
    }

    // const response = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;

    const response = await prisma.session.findUnique({
        where: {
            refreshToken : token
        }
    })

    if(!response){
        return {statusCode: 401, message: "session timed out"};
    }else{
        // console.log(response);

        try{
            const jwToken = jwt.sign(response, SECRET_KEY as string);
            // const refresh_token = jwt.sign(response, REFRESH_TOKEN_SECRET);
            const refresh_token = uuidv4()

            const d = new Date();
            d.setDate(d.getDate() + 7)

            await prisma.$transaction([
                prisma.session.update({
                    where:{
                        refreshToken: token
                    },
                    data: {
                        valid: false
                    }
                }),
                
                prisma.session.create({
                    data:{
                        userId: response.userId,
                        refreshToken: refresh_token,
                        userAgent: userAgent,
                        // expiredAt: d
                    }
                })
            ])

            return {
                statusCode : 200,
                message : "tokens are created",
                access_token : jwToken,
                refresh_token : refresh_token
            }
        }catch{
            return {statusCode : 501, message : "tokens not implemented"}
        }
    }
}