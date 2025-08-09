import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import { getBoardsService } from '../services/board.service';
const prisma = new PrismaClient();

export const getAllBoards = async (req : Request, res : Response) => {

    

    const userId : number = req.body.userId
    const userBoards = getBoardsService( userId );
}

export const createboard = async (req : Request, res: Response) => {
    const newBoard = await prisma.board.create({
        data: {
            userId : 1,
            title : "HelloWorld"
        }
    })

    console.log(newBoard);
}