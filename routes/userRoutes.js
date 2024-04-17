import express from "express";
import {
  getAllUser,
} from "../src/api/v1/controllers/usersController.js";

const router = express.Router();

router.get("/user", getAllUser);


export default router;
