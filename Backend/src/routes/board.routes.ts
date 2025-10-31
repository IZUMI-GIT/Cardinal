import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllBoards } from "../controllers/board/getBoards.controller";
// import { getBoard } from "../controllers/board/getBoard.controller";

const router = Router({mergeParams: true})

router.use(authMiddleware)

router.get("/", getAllBoards);
// router.get("/:boardId", getBoard);
// router.post("/", postBoard);
// router.patch("/boardId", patchBoard);
// router.delete("/:boardId", deleteBoard);

export default router;