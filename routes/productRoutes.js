import express from "express";
import { getProductOrderLimit, getProductId, getProductCategoryId } from "../src/api/v1/controllers/productController.js";

const router = express.Router();

router.get("/product",  getProductOrderLimit);
router.get('/product/:id', getProductId)
router.get('/product/category/:id', getProductCategoryId)

export default router;
