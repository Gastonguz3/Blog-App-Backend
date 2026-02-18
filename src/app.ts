import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"
import noteRouter from "./routes/noteRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"]
  }),
);

app.use(express.json());

app.use("/api/note", noteRouter);
app.use("/auth", authRouter)

export default app;
