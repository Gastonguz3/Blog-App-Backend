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
    const user = req.user as {id: string} //contiene el jwt verificado
    const note = new Note({ author, authorId: user.id , description });
    const saveNote = await note.save();
    if (saveNote) {
      res.status(201).json({
        message: "Nota creada correctamente",
        note: saveNote,
      });
    }
  } catch (error: any) {
    console.error(`Error al crear la nota: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {author, description} = req.body;
        const note = await Note.findById(id)
        if(!note){
            res.status(404).json({error: "Nota no encontrada"})
            return
        }
        const user = req.user as {id: string} 
        if (note.authorId.toString() !== user.id) {
          res.status(403).json({ error: "No autorizado para actualizar la nota" });
          return
        }
        note.author = author
        note.description = description
        note.save()
        res.status(200).json({message: "Nota actualizada correctamente", note: updateNote })
    } catch (error: any) {
        console.error(`Error al crear la publicacion: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const note = await Note.findById(id);
        if(!note){
            res.status(404).json({error: "Nota no eliminada"})
            return
        }
        const user = req.user as {id: string}

        if(note.authorId.toString() !== user.id){
          res.status(403).json({error: "No autorizado para eliminar la nota"})
          return
        }

        await note.deleteOne();
        res.status(200).json({message: `Nota eliminada correctamente`})
        
    } catch (error: any) {
        console.error(`Error al eliminar la nota: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
