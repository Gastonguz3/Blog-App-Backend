import express from "express"
import dotenv from "dotenv"
import publicationRouter from "./routes/publicationRoutes.js"
dotenv.config()

const app = express();

app.use(express.json())

app.use("/api/publication", publicationRouter )

export default app;