import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const getBoardService = async (userId: number) => {

    try{
        const boards = await prisma.board.findMany({
            where: {
                // createdBy: userId
            }
        })
        
        return {boards, message: "got all boards", statusCode: 200}
    }catch(err){
        return {message: "Boards data failed" + (err as Error), statusCode: 404}
    }
}