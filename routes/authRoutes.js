import express from "express";
import passport from "passport";

import {
  loginUser,
  refreshTokenController,
  logoutController,
  googleAuthController,
  resetPasswordController,
} from "../src/api/v1/controllers/authControllers.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
import {
  isEmailValidator,
  signInValidator,
  signUpValidator,
  passwordChangeValidator,
} from "../middlewares/dataValidatorHandler.js";
import {
  DEV_ENV,
  FAILURE_REDIRECT_CLIENT_URL,
  LOGIN_REDIRECT_CLIENT_DEV_URL,
  LOGIN_REDIRECT_CLIENT_URL,
  REGISTER_REDIRECT_CLIENT_URL,
  REGISTER_REDIRECT_CLIENT_DEV_URL,
  FAILURE_REDIRECT_CLIENT_DEV_URL,
  PRODUCTION_ENV,
} from "../config/constants.js";
import { checkEmailHandler } from "../middlewares/checkEmailHandler.js";
import { validateTokenFromParams } from "../middlewares/validateJWT.js";
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
    successRedirect: PRODUCTION_ENV && LOGIN_REDIRECT_CLIENT_URL,
    failureRedirect: PRODUCTION_ENV && FAILURE_REDIRECT_CLIENT_URL,
    failureMessage: true,
  })
);
// Reedirecciona al front
router.get(
  "/auth/google/register/redirect",
  passport.authenticate("google-signup", {
    successRedirect: DEV_ENV
      ? REGISTER_REDIRECT_CLIENT_DEV_URL
      : REGISTER_REDIRECT_CLIENT_URL || "/api/v1/auth/success",
    failureRedirect: DEV_ENV
      ? FAILURE_REDIRECT_CLIENT_DEV_URL
      : FAILURE_REDIRECT_CLIENT_URL || "/api/v1/",
  })
);
router.post("/login", signInValidator, loginUser);
router.get("/auth/success", googleAuthController);
router.get("/logout", logoutController);
router.post("/register", signUpValidator, createNewUser);
router.get("/refresh", refreshTokenController);
router.post("/password-request", isEmailValidator, checkEmailHandler);
router.post(
  "/password-reset",
  passwordChangeValidator,
  resetPasswordController
);
router.post("/password-reset/:token", validateTokenFromParams);
export default router;
