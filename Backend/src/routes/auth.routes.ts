import { Router } from "express";
import { postSignup } from "../controllers/signUp.controller";
import { postRefreshToken } from "../controllers/refreshToken.controller";
import { postSignIn } from "../controllers/signIn.controller";
import { postLogout } from "../controllers/logOut.controller";
const router = Router();

router.post("/signup", postSignup);
router.post("/refresh", postRefreshToken)
router.post("/signin", postSignIn);
router.post("/logout", postLogout);

export default router