import express from "express";
import {getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controller/noteController.js";
import { authenticateToken } from "../services/authService.js";

const router = express.Router();

//Obtener todas las publicaciones
router.get("/", getAllNotes);

//Obtener la publicacion por ID
router.get("/:id", getNoteById);

//Crear una publicacion
router.post("/", authenticateToken, createNote);

//Actualizar publicacion
router.put("/:id", authenticateToken, updateNote);

//Eliminar publicacion
router.delete("/:id", authenticateToken, deleteNote);

export default router;
