import express from "express";
import { getProfileById } from "../src/api/v1/controllers/profileController.js";
import { verifyJWTbyUser } from "../middlewares/validateJWTUniqueUser.js";

const router = express.Router();

router.get('/profile/:id', verifyJWTbyUser, getProfileById);

export default router;