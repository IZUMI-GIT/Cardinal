import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const boardService = async (userId: number, boardId: number) => {

    try{
        const boardExist = await prisma.board.findUnique({
            where: {
                id: boardId,
                createdBy: userId
            }
        })

        if(!boardExist){
            return {message: "user and board combo exist", statusCode: 404}
        }

        const boardData = await prisma.list.findMany({
            where: {
                boardId
            }
        })

        return {boardData, message: `BoardData found for ${boardId}`, statusCode: 200}
    }catch(err){
        return {message: "BoardData failed" + (err as Error), statusCode: 404}
    }
}