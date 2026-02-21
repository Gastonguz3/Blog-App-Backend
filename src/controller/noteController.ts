import Note from "../models/noteModel.js";
import { type Request, type Response } from "express";

export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const allNotes = await Note.find()
    .populate("author", "name email") //trae datos del user
    .sort({createdAt:-1});
    res.status(200).json(allNotes);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      res.status(404).json({ message: "Nota no encontrada" });
      return;
    }
    res.status(200).json(note);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description } = req.body;

    if (!description) {
      res.status(400).json({ message: "La descripcion es obligatoria" });
      return;
    }
    const userId = req.user?.id //viene del middleware authenticateToken
    const note = new Note({ author: userId, description });
    const saveNote = await note.save();
    if (saveNote) {
      res.status(201).json({
        message: "Nota creada correctamente",
        note: saveNote,
      });
    }
  } catch (error: any) {
    console.error(`Error al crear la nota: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const {description} = req.body;
        
        const note = await Note.findById(id)

        if(!note){
            res.status(404).json({message: "Nota no encontrada"})
            return
        }
        //viene del middleware authenticateToken
        const userId = req.user?.id

        //Verifico que el usuario sea el dueño
        if (note.author.toString() !== userId) {
          res.status(403).json({ message: "No autorizado para actualizar la nota" });
          return
        }

        note.description = description
        await note.save()

        const updatedNote = await note.populate("author", "name email")

        res.status(200).json({message: "Nota actualizada correctamente", note: updatedNote })
    } catch (error: any) {
        console.error(`Error al crear la nota: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const note = await Note.findById(id);
        if(!note){
            res.status(404).json({message: "Nota no encontrada"})
            return
        }
        //viene del middleware authenticateToken
        const user = req.user as {id: string}

        //Solo el dueño puede borrar
        if(note.author.toString() !== user.id){
          res.status(403).json({message: "No autorizado para eliminar la nota"})
          return
        }

        await note.deleteOne();
        res.status(200).json({message: `Nota eliminada correctamente`})
        
    } catch (error: any) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
