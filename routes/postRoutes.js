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
  getLogByUserIdController,
} from "../src/api/v1/controllers/postControllers.js";
import {
  postValidator,
  uuidValidator,
} from "../middlewares/dataValidatorHandler.js";
import { verifyJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get("/post", getAllPost);
router.get("/post/user/:id", uuidValidator, getUserPost);
router.get("/post/user/log/:id", uuidValidator, getLogByUserIdController);
router.get("/post/:id", getPostByIdController);
router.get("/post/log/:id", getLogByPostIdController);
router.post("/post", verifyJWT, postValidator, createPostController);
router.patch("/post/:id", verifyJWT,  updatePostController);
router.patch("/post/stock/:id", verifyJWT, updateUserStockController);
router.delete("/post/:id", verifyJWT, softDeletePostController);

export default router;
