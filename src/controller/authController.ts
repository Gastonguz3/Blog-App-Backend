import { type Request, type Response } from "express";
import User from "../models/userModel.js";
import validator from "validator"
import jwt, { type JwtPayload } from "jsonwebtoken";
import { generateEmailToken, generateToken } from "../services/authService.js";
import { comparePassword, hashPassword } from "../services/passwordService.js";
import { sendVerificationEmail } from "../config/sendMail.js";
import { ENV } from "../config/env.js";

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
      res.status(404).json({ message: "Credenciales invalidas" });
      return;
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Credenciales invalidas" });
      return;
    }

    if (!user.isVerified) {   //si no verifico su mail
      res.status(403).json({ message: "Debes verificar tu email" });
      return
    }

    const token = generateToken(user);
    res.status(200).json({ token, user: {_id: user._id, name: user.name, email: user.email} });
    
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "el nombre de usuario es obligatorio" });
      return;
    }
    if (!email || !validator.isEmail(email)) {  //Verifico que el mail este bien escrito
      res.status(400).json({ message: "el email es invalido" });
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ message: "la contraseña debe contener minimo 6 caracteres" });
      return;
    }
    //Verifico que el mail no este ya registrado
    const existingUser = await User.findOne({email})
    if (existingUser) {
      res.status(400).json({ message: "El email ya está registrado" });
      return;
    }

    //hasheo el password para mayor seguridad
    const hashedPassword  = await hashPassword(password);

    //creo el nuevo usuario
    const newUser = new User({ name, password: hashedPassword, email, isVerified: false });
    await newUser.save()

    //Le mando al usuario un email para que verifique su cuenta
    const emailToken = generateEmailToken(newUser)
    await sendVerificationEmail(newUser.email, emailToken);

    res.status(201).json({ message: "Usuario creado: verifica el email" });
    
    /*await newUser.save()

    const token = generateToken(newUser);
    res.status(201).json({ token, user: {_id: newUser._id, name: newUser.name, email: newUser.email} });*/

  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "El email ya existe" });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token  = req.params.token as string;

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return
    }
    //Verifico el usuario y lo guardo en la base de datos
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verificado correctamente" });

  } catch (error: any) {
    console.error(error)
    res.status(400).json({ message: "Sesion invvlida o expirada" });  //token invalido
  }
};