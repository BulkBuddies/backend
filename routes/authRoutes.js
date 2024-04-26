import express from "express";
import passport from "passport";
import {
  loginUser,
  refreshTokenController,
  logoutController,
  googleAuthController,
} from "../src/api/v1/controllers/authControllers.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
import {
  isEmailValidator,
  signInValidator,
  signUpValidator,
} from "../middlewares/dataValidatorHandler.js";
import {
  FAILURE_REDIRECT_CLIENT_URL,
  LOGIN_REDIRECT_CLIENT_URL,
  REGISTER_REDIRECT_CLIENT_URL,
} from "../config/constants.js";
import { checkEmailHandler } from "../middlewares/checkEmailHandler.js";
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
    successRedirect: LOGIN_REDIRECT_CLIENT_URL || "/api/v1/auth/success",
    failureRedirect: FAILURE_REDIRECT_CLIENT_URL || "/api/v1/",
  })
);
// Reedirecciona al front
router.get(
  "/auth/google/register/redirect",
  passport.authenticate("google-signup", {
    successRedirect: REGISTER_REDIRECT_CLIENT_URL || "/api/v1/auth/success",
    failureRedirect: FAILURE_REDIRECT_CLIENT_URL || "/api/v1/",
  })
);

router.post("/login", signInValidator, loginUser);
router.get("/auth/success", googleAuthController);
router.get("/logout", logoutController);
router.post("/register", signUpValidator, createNewUser);
router.get("/refresh", refreshTokenController);
router.post("/password-request", isEmailValidator, checkEmailHandler);
export default router;
