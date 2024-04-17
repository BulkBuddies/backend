import express from "express";
import {
  loginUser,
  refreshTokenController,
  logoutController,
} from "../src/api/v1/controllers/authControllers.js";
import { validateParamLogin } from "../middlewares/validateParamLogin.js";
import { validateParamUser } from "../middlewares/validateParamUser.js";
import { createNewUser } from "../src/api/v1/controllers/usersController.js";
const router = express.Router();

router.post("/login", validateParamLogin, loginUser);
router.get("/logout", logoutController);
router.post("/register", validateParamUser, createNewUser);
router.get("/refresh", refreshTokenController);
export default router;
