import express from "express";
import { getProductOrderLimit, getProductId } from "../src/api/v1/controllers/productController.js";

const router = express.Router();

router.get("/product",  getProductOrderLimit);
router.get('/product/id/:id', getProductId)

export default router;
