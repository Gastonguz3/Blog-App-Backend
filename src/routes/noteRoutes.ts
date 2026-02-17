import express from "express";
import {getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controller/noteController.js";

const router = express.Router();

//Obtener todas las publicaciones
router.get("/", getAllNotes);

//Obtener la publicacion por ID
router.get("/:id", getNoteById);

//Crear una publicacion
router.post("/", createNote);

//Actualizar publicacion
router.put("/:id", updateNote);

//Eliminar publicacion
router.delete("/:id", deleteNote);

export default router;
