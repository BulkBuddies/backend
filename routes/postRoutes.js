import { Router } from "express";
import {
  getAllPost,
  getUserPost,
  createPostController,
  updatePostController,
  softDeletePostController,
  updateUserStockController,
  getPostByIdController,
  getLogByPostIdController,
  getLogByUserIdController
} from "../src/api/v1/controllers/postControllers.js";

const router = Router();

router.get("/post", getAllPost);
router.get("/post/user/:id", getUserPost);
router.get("/post/user/log/:id", getLogByUserIdController);
router.get("/post/:id", getPostByIdController);
router.get("/post/log/:id", getLogByPostIdController);
router.post("/post", createPostController);
router.patch("/post/:id", updatePostController);
router.patch("/post/stock/:id", updateUserStockController);
router.delete("/post/:id", softDeletePostController);

export default router;
