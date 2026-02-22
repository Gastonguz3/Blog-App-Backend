import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

connectDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Server Running on port ${ENV.PORT}`);
  });
})
.catch((err) => {
  console.error(`Database connection fail ${err}`)
})
