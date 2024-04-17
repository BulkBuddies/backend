import express from "express";
import {
  createNewUser,
  getAllUser,
} from "../src/api/v1/controllers/usersController.js";
import { validateParamUser } from "../middlewares/validateParamUser.js";
import { isLoggedin } from "../middlewares/validateJWT.js";

const router = express.Router();

router.post("/", validateParamUser, createNewUser);
router.get("/", isLoggedin, getAllUser);

export default router;
