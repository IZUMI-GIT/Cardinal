import * as z from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface SignUp {
    name: string,
    email: string,
    password: string,
    username: string
}

export const signupService = async (details : SignUp)  => {
    const emailCheck = await prisma.user.findUnique({
        where : {
            email : details.email
        }
    })

    if(emailCheck){
        return {status : 409, message : "user already exists"}
    }
    else{
        const signupSchema = z.object({
        email : z.email(),
        password : z.string().min(6),
        name : z.string(),
        username : z.string()
        })

        const result = signupSchema.safeParse({
            email : details.email,
            password : details.password,
            name : details.name,
            username : details.username
        });

        if(!result.success){
            return {status : 401, message : "enter details correctly"}
        }else{
            try{
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(details.password, salt);

                const newUser = await prisma.user.create({
                    data : {
                        email : details.email,
                        hashedPassword,
                        name : details.name,
                        userName : details.username
                    }
                })

                
            }catch(e){

            }
        }
    }

}