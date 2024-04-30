import express from "express";
import {
  getProfileById,
  updateProfileById,
} from "../src/api/v1/controllers/profileController.js";
import { verifyJWT } from "../middlewares/validateJWT.js";
import { checkIdMatchHandler } from "../middlewares/checkIdMatchHandler.js";
import { profileValidator } from "../middlewares/dataValidatorHandler.js";

const router = express.Router();

router.get("/profile/:id", getProfileById);
router.patch(
  "/profile/:id",
  verifyJWT,
  checkIdMatchHandler,
  profileValidator,
  updateProfileById
);

export default router;
