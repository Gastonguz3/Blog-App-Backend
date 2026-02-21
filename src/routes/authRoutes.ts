import express from "express";
import { login, register, verifyEmail} from "../controller/authController.js";

const router = express.Router();

router.get("/verify/:token", verifyEmail);

router.post("/login", login)
router.post("/register", register)

export default router;