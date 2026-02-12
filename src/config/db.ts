import mongoose from "mongoose";

export const connectDB = async () : Promise<void>=> {
  try {
    const dbURI = process.env.MONGODB_URI;
    if(!dbURI) throw Error ("MONGODB_URI no esta definida en las variables de entorno")
    await mongoose.connect(dbURI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
