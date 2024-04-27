import { Router } from 'express';
import { getAllPost, 
    createPostController } from '../src/api/v1/controllers/postControllers.js';

const router = Router();

router.get('/post', getAllPost)
router.post('/post', createPostController)

export default router;