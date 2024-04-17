import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerDocs from "./src/api/v1/utils/swagger.js";
import errorHandler from "./middlewares/error.handler.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/validateJWT.js";
import corsOptions from "./config/cors.js";
import { logger } from "logger-express";
const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
/* app.use(logger()); */
app.use(cookieParser());
swaggerDocs(app, PORT);
app.use("/", authRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({ Message: "Welcome" });
});
app.use(verifyJWT);
app.use("/", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
