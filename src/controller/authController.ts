import { type Request, type Response } from "express";
import User from "../models/userModel.js";
import { generateToken } from "../services/authService.js";
import { comparePassword, hashPassword } from "../services/passwordService.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400).json({ message: "el email es obligatorio" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "la contraseña es obligatoria" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    const passwordMatch = await comparePassword(user.password, password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Credenciales invalidas" });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "el nombre de usuario es obligatorio" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "el email es obligatorio" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "la contraseña es obligatoria" });
      return;
    }
    
    const existingUser = await User.findOne({email})
    if (existingUser) {
      res.status(400).json({ message: "El email ya está registrado" });
      return;
    }

    const hashedPassword = hashPassword(password);

    const newUser = new User({ name, password: hashedPassword, email });
    await newUser.save()

    const token = generateToken(newUser);
    res.status(201).json({ message:"Usuario creado correctamente", token });

  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "El email ya existe" });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
