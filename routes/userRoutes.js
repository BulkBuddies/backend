import express from "express";
import { checkEmailEquality, getAllUser, validateUsernameController } from "../src/api/v1/controllers/usersController.js";
import { verifyJWT, validateUsername } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/user", verifyJWT, getAllUser);
router.get("/user/validate", validateUsername, validateUsernameController);
router.get("/user/email", checkEmailEquality)

export default router;
