import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerDocs from "./src/api/v1/utils/swagger.js";
import errorHandler from "./middlewares/error.handler.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
swaggerDocs(app, PORT);
app.use("/", userRoutes);
app.use("/login", loginRoute);
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.status(200).json({ Message: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
