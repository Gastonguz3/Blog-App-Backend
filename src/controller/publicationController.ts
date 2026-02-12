import Publication from "../models/publicationModel.js";
import { type Request, type Response } from "express";

export const getAllPublications = async (req: Request, res: Response): Promise<void> => {
  try {
    const allPublications = await Publication.find();
    res.status(200).json(allPublications);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPublicationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const publication = await Publication.findById(id);
    if (!publication) {
      res.status(404).json({ error: "Publicacion no encontrada" });
      return;
    }
    res.status(200).json(publication);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPublication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { author, description } = req.body;
    if (!author) {
      res.status(400).json({ message: "El author es obligatorio" });
      return;
    }
    if (!description) {
      res.status(400).json({ message: "La descripcion es obligatoria" });
      return;
    }
    const publication = new Publication({ author, description });
    const savePublication = await publication.save();
    if (savePublication) {
      res.status(201).json({
        message: "Publicacion creada correctamente",
        publication: savePublication,
      });
    }
  } catch (error: any) {
    console.error(`Error al crear la publicacion: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePublication = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {author, description} = req.body;
        const updatePublication = await Publication.findByIdAndUpdate(id, {author, description}, {new: true} )
        if(!updatePublication){
            res.status(404).json({error: "Publicacion no actualizada"})
            return
        }
        res.status(200).json({message: "Publicacion actualizada correctamente", publication: updatePublication })
    } catch (error: any) {
        console.error(`Error al crear la publicacion: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletePublication = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deletePublication = await Publication.findByIdAndDelete(id);
        if(!deletePublication){
            res.status(404).json({error: "Publicacion no eliminada"})
            return
        }
        res.status(200).json({message: `Publicacion ${id} eliminada correctamente`}).end()
        
    } catch (error: any) {
        console.error(`Error al eliminar la publicacion: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
