import express from "express";
import passport from "passport";
import {
  loginUser,
  refreshTokenController,
  logoutController,
} from "../src/api/v1/controllers/authControllers.js";
import { validateParamLogin } from "../middlewares/validateParamLogin.js";
import { validateParamUser } from "../middlewares/validateParamUser.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
const router = express.Router();

//routes google

router.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);


router.post("/login", validateParamLogin, loginUser);
router.get("/logout", logoutController);
router.post("/register", validateParamUser, createNewUser);
router.get("/refresh", refreshTokenController);
export default router;
