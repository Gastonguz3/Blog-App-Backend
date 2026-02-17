import { ENV } from "../config/env.js";
import type { UserDocument } from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const generateToken = (user: UserDocument) => {
    return jwt.sign({id: user._id, email: user.email},ENV.JWT_SECRET,{expiresIn: "1h"}  )
}