import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () : Promise<void>=> {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
