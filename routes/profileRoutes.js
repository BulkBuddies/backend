import express from "express";
import { getProfileById, updateProfileById} from "../src/api/v1/controllers/profileController.js";
import { verifyJWTbyUser } from "../middlewares/validateJWTUniqueUser.js";

const router = express.Router();

router.get('/profile/:id', getProfileById);
router.patch('/profile/:id', verifyJWTbyUser, updateProfileById);

export default router;