import express from "express"
import { postSignup } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/signup", postSignup);
// router.post("/refresh-token", postRefreshToken)
// router.post("/signin", postSignin);
// router.post("/login", postLogout);

export default router