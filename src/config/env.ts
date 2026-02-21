import dotenv from "dotenv"

dotenv.config()

const requiredEnv = ["PORT","FRONTEND_URL","MONGODB_URI", "JWT_SECRET","EMAIL_HOST","EMAIL_USER", "EMAIL_PASS"]

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
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string
};