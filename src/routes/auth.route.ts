import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth";
const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticateToken as any, logout);

export default router;
