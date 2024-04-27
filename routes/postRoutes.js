import { Router } from 'express';
import { getAllPost, getUserPost, 
    createPostController } from '../src/api/v1/controllers/postControllers.js';

const router = Router();

router.get('/post', getAllPost)
router.get('/post/user', getUserPost)
router.post('/post', createPostController)

export default router;