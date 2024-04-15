import express from "express";
import { createNewUser , getAllUser } from '../src/api/v1/controllers/usersController.js';
import {validateParamUser } from '../middlewares/validateParamUser.js';
import { isLogin } from '../middlewares/isLogin.js';

const router = express.Router();

router.post("/", validateParamUser, createNewUser)
router.get("/", isLogin, getAllUser)

export default router;