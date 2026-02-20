import express from "express";
import { authenticateToken } from "../services/authService.js";
import { deleteUser, updateUsername } from "../controller/userController.js";

const router = express.Router();

router.put("/me", authenticateToken, updateUsername);

router.delete("/me", authenticateToken, deleteUser);

export default router;
