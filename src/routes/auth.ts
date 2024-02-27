import { register, login } from "../controller/auth";
import express from "express";
import { authRateLimiter } from "../helpers/rateLimiter";
const router = express.Router();

router.post("/login", authRateLimiter, login)
router.post("/register", authRateLimiter, register)


export default router;