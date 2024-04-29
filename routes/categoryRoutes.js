import express from "express"
import { getAllCategoriesController } from "../src/api/v1/controllers/categoryController.js"

const router = express.Router();

router.get('/category',  getAllCategoriesController)

export default router;