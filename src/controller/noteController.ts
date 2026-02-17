import Note from "../models/noteModel.js";
import { type Request, type Response } from "express";

export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const allNotes = await Note.find();
    res.status(200).json(allNotes);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      res.status(404).json({ error: "Publicacion no encontrada" });
      return;
    }
    res.status(200).json(note);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
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
    const note = new Note({ author, description });
    const saveNote = await note.save();
    if (saveNote) {
      res.status(201).json({
        message: "Publicacion creada correctamente",
        note: saveNote,
      });
    }
  } catch (error: any) {
    console.error(`Error al crear la publicacion: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {author, description} = req.body;
        const updateNote = await Note.findByIdAndUpdate(id, {author, description}, {new: true} )
        if(!updateNote){
            res.status(404).json({error: "Publicacion no actualizada"})
            return
        }
        res.status(200).json({message: "Publicacion actualizada correctamente", note: updateNote })
    } catch (error: any) {
        console.error(`Error al crear la publicacion: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const deleteNote = await Note.findByIdAndDelete(id);
        if(!deleteNote){
            res.status(404).json({error: "Publicacion no eliminada"})
            return
        }
        res.status(200).json({message: `Publicacion ${id} eliminada correctamente`}).end()
        
    } catch (error: any) {
        console.error(`Error al eliminar la publicacion: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
