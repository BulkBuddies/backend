import { Router } from 'express';
import { getPostController, 
    createPostController } from '../src/api/v1/controllers/postControllers.js';

const router = Router();

router.get('/post', getPostController)
router.post('/post', createPostController)

export default router;