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
  getAllPostByCategoryId,
  getLogByUserIdController,
} from "../src/api/v1/controllers/postControllers.js";
import {
  postValidator,
  updatePostValidator,
  updateUserStockValidator,
  uuidValidator,
} from "../middlewares/dataValidatorHandler.js";
import { verifyJWT } from "../middlewares/validateJWT.js";
import checkUserHandler from "../middlewares/checkUserHandler.js";

const router = Router();

router.get("/post", getAllPost);
router.get("/post/user/:id", uuidValidator, checkUserHandler, getUserPost);
router.get(
  "/post/user/log/:id",
  uuidValidator,
  checkUserHandler,
  getLogByUserIdController
);
router.get("/post/:id", getPostByIdController);
router.get("/post/category/:id", uuidValidator, getAllPostByCategoryId);
router.get("/post/log/:id", uuidValidator, getLogByPostIdController);
router.post("/post", verifyJWT, postValidator, createPostController);
router.patch(
  "/post/:id",
  verifyJWT,
  uuidValidator,
  updatePostValidator,
  updatePostController
);
router.patch(
  "/post/stock/:id",
  verifyJWT,
  updateUserStockValidator,
  checkUserHandler,
  updateUserStockController
);
router.delete("/post/:id", verifyJWT, uuidValidator, softDeletePostController);

export default router;
