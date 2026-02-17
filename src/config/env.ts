import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["PORT","MONGODB_URI", "JWT_SECRET"]

for(const key of requiredEnv){
    if(!process.env[key]){
        throw new Error(`${key} no está definida en las variables de entorno`);
    }
}

export const ENV = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};