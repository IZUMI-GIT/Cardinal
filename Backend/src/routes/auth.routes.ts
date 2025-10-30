import { Router } from "express";
import { getUsername, postSignup } from "../controllers/auth/signUp.controller";
import { postRefreshToken } from "../controllers/auth/refreshToken.controller";
import { postSignIn } from "../controllers/auth/signIn.controller";
import { postLogout } from "../controllers/auth/logOut.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/AppError";
const prisma = new PrismaClient();
const router = Router({mergeParams: true});

router.post("/signup", postSignup);
router.get("/username/:username", getUsername)
router.post("/refresh", postRefreshToken)
router.post("/signin", postSignIn);
router.post("/logout", authMiddleware, postLogout);
router.get('/me', authMiddleware, async (req, res, next) => {
    const userId = req.userId;
    try{
        const user = await prisma.user.findUnique({ where: { id: userId } });
        console.log(user)
        res.json({
            user: {
                id: user?.id,
                email: user?.email,
                username: user?.userName,
                role: user?.role
            }
        });
    }catch{
        return next(new AppError("Failed here", 500))
    }
});


export default router