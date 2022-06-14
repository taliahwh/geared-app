import express from 'express';

import {
  getAllPosts,
  createNewPost,
  getPostById,
} from '../controllers/postController.js';

// Middleware
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createNewPost);

router.get('/explore', authMiddleware, getAllPosts);

router.get('/:id', authMiddleware, getPostById);

export default router;
