import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const usernameService = async ( username: string) => {

    const usernameSchema = z.string()

    const schemaResponse = usernameSchema.safeParse(
        username
    )


    if(!schemaResponse.success){
        return {statusCode: 404, message: "Invalid username"};
    }

    try{
        const newUsername = await prisma.user.findUnique({
            where: {
                userName : username
            }
        })

        if(newUsername){
            return {
                statusCode: 200,
                message: "exists",
                exists : true
            }
        }else{
            return {
                statusCode: 200,
                message: "username doesn't exists",
                exists: false
            }
        }
    }catch{
        return {statusCode: 500, message: "Username-Internal error"}
    }
}