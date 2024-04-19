import express from "express";
import { getAllUser } from "../src/api/v1/controllers/usersController.js";
import { verifyJWT } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/user", verifyJWT, getAllUser);

export default router;
