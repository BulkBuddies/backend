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
import categoryRoutes from "./routes/categoryRoutes.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";
import { logger } from "logger-express";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import session from "express-session";
import {
  DEV_ENV,
  JWT_SECRET,
  PRODUCTION_ENV,
  TEST_ENV,
} from "./config/constants.js";
import { client } from "./config/redis.js";
import RedisStore from "connect-redis";
import { MemoryStore } from "express-session";
import chalk from "chalk";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
PRODUCTION_ENV && app.use(logger());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* 
PRODUCTION_ENV && client.connect();

PRODUCTION_ENV &&
  client.on("error", (err) => {
    console.log("Redis error: ", err);
  }); */

app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore(),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: PRODUCTION_ENV,
      sameSite: PRODUCTION_ENV ? "None" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
swaggerDocs(app, PORT);

let count = 1;
let showlogs = (req, res, next) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

app.use(showlogs);

app.get("/api/v1", async (req, res) => {
  res.status(200).json({ message: "Welcome" });
});
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", regionRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", categoryRoutes);

app.get("*", notFoundHandler);
app.use(errorHandler);

if (!TEST_ENV) {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`LISTENING ON ${PORT}`));
  });
}

export { app };
