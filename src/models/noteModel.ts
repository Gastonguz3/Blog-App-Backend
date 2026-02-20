import { Schema, Types, model } from "mongoose";

export interface INote {
  author: Types.ObjectId  
  description: string,
  createdAt: Date,
  updatedAt: Date
}

const NoteSchema = new Schema<INote>({
  author: {                        //Este ObjectId hace referencia al User
    type: Schema.Types.ObjectId,  //tipo de dato que representa un identificador de MongoDB
    ref: "User",                  //One to Many: 1 usuario -> Muchas notas 
    required: true
  },
  description: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Note  = model<INote>("Note", NoteSchema);

export default Note;
