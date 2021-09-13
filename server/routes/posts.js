
import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

import { getPosts, createPost, getPost, updatePost, deletePost, likePost } from '../controllers/postsController.js';

router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', auth, getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);



export default router;