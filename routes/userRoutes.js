import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserById,
} from "../src/api/v1/controllers/usersController.js";
import { verifyJWT } from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id",verifyJWT, deleteUser);

export default router;
