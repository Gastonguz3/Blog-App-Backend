import express from "express";
import { getAllPublications, getPublicationById, createPublication, updatePublication, deletePublication } from "../controller/publicationController.js";

const router = express.Router();

//Obtener todas las publicaciones
router.get("/", getAllPublications);

//Obtener la publicacion por ID
router.get("/:id", getPublicationById);

//Crear una publicacion
router.post("/", createPublication);

//Actualizar publicacion
router.put("/:id", updatePublication);

//Eliminar publicacion
router.delete("/:id", deletePublication);

export default router;
