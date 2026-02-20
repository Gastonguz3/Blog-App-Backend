import { JwtPayload } from "jsonwebtoken";

//Extiendo el tipo de Express de manera global

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
      };
    }
  }
}
