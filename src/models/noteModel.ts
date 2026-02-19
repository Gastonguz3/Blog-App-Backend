import { Schema, Types, model } from "mongoose";

export interface INote {
  author: string,           //nombre visible
  authorId: Types.ObjectId  //relacion real
  description: string,
  createdAt: Date,
  updatedAt: Date
}

const NoteSchema = new Schema<INote>({
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,  //tipo de dato que representa un identificador de MongoDB
    ref: "User",                  //Este ObjectId pertenece a la colección User
    required: true
  },
  description: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Note  = model<INote>("Note", NoteSchema);

export default Note;
