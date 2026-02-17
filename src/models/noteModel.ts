import { Schema, model } from "mongoose";

export interface INote {
  author: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

const NoteSchema = new Schema<INote>({
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Note  = model<INote>("Note", NoteSchema);

export default Note;
