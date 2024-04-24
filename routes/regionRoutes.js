import express from "express"
import { getAllRegiones, getComunaByRegionId } from "../src/api/v1/controllers/regionController.js"

const router = express.Router();

router.get('/region',  getAllRegiones)
router.get('/region/:id', getComunaByRegionId)

export default router;