import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"
import noteRouter from "./routes/noteRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { ENV } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
  }),
);

app.use(express.json());

app.use("/api/note", noteRouter);
app.use("/user", userRouter)
app.use("/auth", authRouter)

export default app;
