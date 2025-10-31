// import { NextFunction, Request, Response } from "express";
// import { boardService } from "../../services/board/board.service";
// import { AppError } from "../../utils/AppError";

// export const getBoard = async (req: Request, res: Response, next: NextFunction) => {

//     const userId: number = req.userId!;
//     const boardId: number = Number(req.params.boardId);

//     try{
//         const boardResponse = await boardService( userId, boardId);
//         // const {boardData, message} = boardResponse;

//         // if(boardResponse.statusCode !== 200){
//         //     return next(new AppError(message, boardResponse.statusCode))
//         }
//         return res.status(200).json({ boardData, message })
//     }catch{
//         return next(new AppError("boardData failed", 500))
//     }
// }