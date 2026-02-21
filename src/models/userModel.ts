import {Schema, model, type HydratedDocument } from "mongoose";

export interface IUser {
    name: string,
    password: string,
    email: string,
    isVerified: boolean
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    isVerified: {     //Para verificar el mail del usuario
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = model<IUser>("User", userSchema)

export default User;
export type UserDocument = HydratedDocument<IUser>;