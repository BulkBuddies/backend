import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "./src/api/v1/passport/passport.js";
import swaggerDocs from "./src/api/v1/utils/swagger.js";
import errorHandler from "./middlewares/error.handler.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/validateJWT.js";
import corsOptions from "./config/cors.js";
import { logger } from "logger-express";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import session from "express-session";
const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
/* app.use(logger()); */
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
swaggerDocs(app, PORT);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome" });
});
app.use("/", productRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.get("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
