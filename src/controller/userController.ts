import type { Request, Response } from "express";
import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import mongoose from "mongoose";

//Actualizo el nombre de usuario
export const updateUsername = async (req: Request,res: Response): Promise<void> => {
  try {
    const userIdToken = req.user?.id
    const { newName } = req.body;
    if(!newName || newName.trim() === ""){
      res.status(400).json({message: "Nombre Invalido"})
      return
    }
    const updatedUser = await User.findByIdAndUpdate(userIdToken, {name: newName}, {new: true}) //devuelve el usuario actualizado
    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario actualizado correctamente", user: updatedUser });

  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Elimina la cuenta
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userIdToken = req.user?.id
    const user = await User.findById(userIdToken);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    await user.deleteOne();
    
    //Elimino las notas que el usuario creo
    await Note.deleteMany({author: new mongoose.Types.ObjectId(userIdToken)})

    res.status(200).json({ message: `Usuario ${user.name} eliminado correctamente` });
    
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};
