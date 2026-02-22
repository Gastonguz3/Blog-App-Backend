import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["PORT","FRONTEND_URL","MONGODB_URI", "JWT_SECRET","RESEND_API_KEY"]

for(const key of requiredEnv){
    if(!process.env[key]){
        throw new Error(`${key} no está definida en las variables de entorno`);
    }
}

export const ENV = {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
};