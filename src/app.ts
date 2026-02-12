import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import publicationRouter from "./routes/publicationRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"]
  }),
);

app.use(express.json());

app.use("/api/publication", publicationRouter);

export default app;
