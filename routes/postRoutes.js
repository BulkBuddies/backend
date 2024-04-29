import { Router } from "express";
import {
  getAllPost,
  getUserPost,
  createPostController,
  updatePostController,
  softDeletePostController,
  updateUserStockController
} from "../src/api/v1/controllers/postControllers.js";

const router = Router();

router.get("/post", getAllPost);
router.get("/post/:userId", getUserPost);
router.post("/post", createPostController);
router.patch("/post/:id", updatePostController);
router.patch("/post/stock/:id", updateUserStockController);
router.delete("/post/:id", softDeletePostController);

export default router;
