import { NextFunction, Request, Response } from "express";
import { getBoardService } from "../../services/board/getBoards.service";
import { AppError } from "../../utils/AppError";

export const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = req.userId!;

    try{
        const boardsResponse = await getBoardService( userId );
        const {boards, message} = boardsResponse;
        if(boardsResponse.statusCode !== 200){
            return next(new AppError(message, boardsResponse.statusCode))
        }
        
        return res.status(200).json({ boards, message })
    }catch{
        return next(new AppError("boards data failed", 500))
    }

}