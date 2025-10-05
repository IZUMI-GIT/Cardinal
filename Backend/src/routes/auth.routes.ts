import { Router } from "express";
import { getUsername, postSignup } from "../controllers/signUp.controller";
import { postRefreshToken } from "../controllers/refreshToken.controller";
import { postSignIn } from "../controllers/signIn.controller";
import { postLogout } from "../controllers/logOut.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router({mergeParams: true});

router.post("/signup", postSignup);
router.get("/username/:username", getUsername)
router.post("/refresh", postRefreshToken)
router.post("/signin", postSignIn);
router.post("/logout", authMiddleware, postLogout);
router.get("/me", getMeUser);

export default router