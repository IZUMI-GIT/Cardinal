import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt, {JwtPayload} from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const refreshService = async (token : string) => {

    if(!REFRESH_TOKEN_SECRET || !SECRET_KEY){
        return {status: 401, message: "Key corrupted"};
    }

    const response = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;

    if(!response.id){
        return {status: 401, message: "session timed out"};
    }else{
        console.log(response);

        try{
            const jwToken = jwt.sign(response, SECRET_KEY as string);
            const refresh_token = jwt.sign(response, REFRESH_TOKEN_SECRET);

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
                        userId: response.id,
                        refreshToken: refresh_token,
                        userAgent: "chrome",
                    }
                })
            ])

            return {
                status : 201,
                message : "tokens are created",
                access_token : jwToken,
                refresh_token : refresh_token
            }
        }catch(e){
            return {status : 501, message : "tokens not implemented"}
        }
    }
}