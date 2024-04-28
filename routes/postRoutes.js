import { Router } from 'express';
import { getAllPost, getUserPost, 
    createPostController, 
    updatePostController,
    deletePostController } from '../src/api/v1/controllers/postControllers.js';

const router = Router();

router.get('/post', getAllPost)
router.get('/post/user', getUserPost)
router.post('/post', createPostController)
router.put('/post/update', updatePostController)
router.delete('/post/delete', deletePostController)

export default router;