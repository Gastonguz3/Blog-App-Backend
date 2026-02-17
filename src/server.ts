import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

connectDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Server Running on http://localhost:${ENV.PORT}`);
  });
});
