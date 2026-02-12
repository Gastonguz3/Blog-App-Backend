import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPublication extends Document {
  author: string,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

const publicationSchema : Schema<IPublication> = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Publication : Model<IPublication> = mongoose.model<IPublication>("Publication", publicationSchema);

export default Publication;
