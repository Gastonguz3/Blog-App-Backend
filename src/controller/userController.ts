import type { Request, Response } from "express";
import User from "../models/userModel.js";

export const updateUsername = async (req: Request,res: Response): Promise<void> => {
  const id = req.params.id;
  const { newName } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    user.name = newName;
    const newUser = await user.save();
    res.status(200).json({ message: "Nota actualizada correctamente", user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    await user.deleteOne();
    res
      .status(200)
      .json({ message: `Usuario ${user.name} eliminado correctamente` });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
