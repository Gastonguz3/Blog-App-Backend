import express from "express";
import { authenticateToken } from "../services/authService.js";
import { deleteUser, updateUsername } from "../controller/userController.js";

const router = express.Router();

router.put("/:id", authenticateToken, updateUsername);

router.delete("/:id", authenticateToken, deleteUser);

export default router;
