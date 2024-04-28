import { Router } from "express";
import {
  getAllPost,
  getUserPost,
  createPostController,
  updatePostController,
  softDeletePostController,
} from "../src/api/v1/controllers/postControllers.js";

const router = Router();

router.get("/post", getAllPost);
router.get("/post/:userId", getUserPost);
router.post("/post", createPostController);
router.put("/post/:userId", updatePostController);
router.delete("/post/:userId", softDeletePostController);

export default router;
