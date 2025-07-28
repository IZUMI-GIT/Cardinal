import express from "express"
import { postSignup } from "../controllers/signUp.controller";
import { postRefreshToken } from "../controllers/refreshToken.controller";
const router = express.Router({mergeParams: true});

router.post("/signup", postSignup);
router.post("/refresh-token", postRefreshToken)
// router.post("/signin", postSignin);
// router.post("/login", postLogout);

export default router