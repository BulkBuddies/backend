import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "./src/api/v1/passport/passport.js";
import swaggerDocs from "./src/api/v1/utils/swagger.js";
import errorHandler from "./middlewares/error.handler.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";
import { logger } from "logger-express";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import session from "express-session";
import { JWT_SECRET, PRODUCTION_ENV, TEST_ENV } from "./config/constants.js";
import { client } from "./config/redis.js";
import RedisStore from "connect-redis";
import { MemoryStore } from "express-session";
import chalk from "chalk";
const PORT = process.env.PORT;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
PRODUCTION_ENV && app.use(logger());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

client.connect();

client.on("error", (err) => {
  console.log("Redis error: ", err);
});

app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: PRODUCTION_ENV
      ? new RedisStore({ client: client })
      : new MemoryStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());
swaggerDocs(app, PORT);

app.get("/api/v1", async (req, res) => {
  res.status(200).json({ message: "Welcome" });
});
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", regionRoutes);
app.use("/api/v1", postRoutes);

app.get("*", notFoundHandler);
app.use(errorHandler);

if (!TEST_ENV) {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`LISTENING ON ${PORT}`));
  });
}

// Cambio - Felipe C



export { app, client };
