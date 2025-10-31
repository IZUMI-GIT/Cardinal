import { Response } from "express"
import { AppError } from "../utils/AppError"

export const setAuthCookies = async (res: Response, tokens: {access_token: string, refresh_token: string}): Promise<void> => {

    try{
        if(!tokens || !tokens.access_token || !tokens.refresh_token){
            throw new AppError("Invalid tokens provided to setAuthCookies fn", 500)
        }

        res.cookie('accessToken', tokens.access_token, {
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production,
        maxAge : 15*60*1000    //15 minutes
        })

        res.cookie('refreshToken', tokens.refresh_token, {
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge : 7*24*60*60*1000    //7 days
        })

        return 
    }catch{
        throw new Error("cookies not set")
    }
}