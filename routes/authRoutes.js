import express from "express";
import passport from "passport";
import {
  loginUser,
  refreshTokenController,
  logoutController,
  googleAuthController,
} from "../src/api/v1/controllers/authControllers.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
import { signInValidator, signUpValidator } from "../middlewares/dataValidatorHandler.js";
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google-signin", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/register",
  passport.authenticate("google-signup", { scope: ["profile", "email"] })
);

// Reedirecciona al front
router.get(
  "/auth/google/redirect",
  passport.authenticate("google-signin", {
    // Pasar a ENV
    successRedirect: "/auth/success",
    failureRedirect: "http://localhost:5173/auth/login",
  })
);
// Reedirecciona al front
router.get(
  "/auth/google/register/redirect",
  passport.authenticate("google-signup", {
    successRedirect: "http://localhost:5173/user/dashboard?register=true",
    //email .. este lo tenemos que registar en la base de datos
    // auth/register
    failureRedirect: "/login",
  })
);

router.post("/login", signInValidator, loginUser);
router.get("/auth/success", googleAuthController);
router.get("/logout", logoutController);
router.post("/register", signUpValidator, createNewUser);
router.get("/register/success");
router.get("/refresh", refreshTokenController);
export default router;
