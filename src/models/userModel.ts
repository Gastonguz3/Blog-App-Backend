import {Schema, model, type HydratedDocument } from "mongoose";

export interface IUser {
    name: string,
    password: string,
    email: string
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
    }
}, {timestamps: true})

const User = model<IUser>("User", userSchema)

export default User;
export type UserDocument = HydratedDocument<IUser>;