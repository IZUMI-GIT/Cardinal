import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken';
import { config } from "../config/config";

const primsa = new PrismaClient();

const SECRET_KEY = config.SECRET_KEY;

export const logoutService = async (accessToken: string, refreshToken: string) => {

    if(!accessToken || !refreshToken){
        return {statusCode : 401, message: "No cookies found"}
    }

    try{
        const response = await primsa.session.findUnique({
            where: {
                refreshToken
            }
        })

        const jwtResponse = jwt.verify(accessToken, SECRET_KEY);

        if(!response?.valid && !jwtResponse){
            return {statusCode: 401, message: "session timed out"}
        }

        const sessionRefreshResponse = await primsa.session.update({
            where: {
                refreshToken: refreshToken
            }, 
            data : {
                valid : false
            }
        })
        // console.log("sessionRefreshResponse:", sessionRefreshResponse)
        return {statusCode: 200, message: "session updated"}
    }catch(e){
        // console.log(e)
        return {statusCode: 500, message: "token internal error"}
    }

}