import express from "express"
import { postSignup } from "../controllers/auth.middleware";
const router = express.Router();

router.post("/signup", postSignup);
// router.post("/signin", postSignin);
// router.post("/login", postLogout);

export default router