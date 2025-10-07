import { Router } from "express";
import { getUsername, postSignup } from "../controllers/signUp.controller";

import { postRefreshToken } from "../controllers/refreshToken.controller";
import { postSignIn } from "../controllers/signIn.controller";
import { postLogout } from "../controllers/logOut.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router({mergeParams: true});

router.post("/signup", postSignup);
router.get("/username/:username", getUsername)
router.post("/refresh", postRefreshToken)
router.post("/signin", postSignIn);
router.post("/logout", authMiddleware, postLogout);
router.get('/me', authMiddleware, async (req, res) => {
    const userId = req.userId;
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
});


export default router