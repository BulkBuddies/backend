import express from "express";
import { getProfileById, updateProfileById} from "../src/api/v1/controllers/profileController.js";
import { verifyJWT } from "../middlewares/validateJWT.js";


const router = express.Router();

router.get('/profile/:id', getProfileById);
router.patch('/profile/:id', verifyJWT, updateProfileById);

export default router;