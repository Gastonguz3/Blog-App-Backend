import { ENV } from "../config/env.js";
import type { UserDocument } from "../models/userModel.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (user: UserDocument) => {
  return jwt.sign({ id: user._id, email: user.email }, ENV.JWT_SECRET, {expiresIn: "1h"});
};

export const authenticateToken = ( req: Request, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  try {
    jwt.verify(token, ENV.JWT_SECRET);
    next();
  } catch (err: any) {
    console.error("Error en autenticacion:", err);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
