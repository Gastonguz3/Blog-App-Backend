import express from "express"
import { config } from "dotenv";
config()

const app = express();

app.use(express.json())

app.get("/api/publication" )

export default app;