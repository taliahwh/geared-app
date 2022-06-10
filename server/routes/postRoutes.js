import express from 'express';

import { getAllPosts, createNewPost } from '../controllers/postController.js';

// Middleware
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createNewPost);

router.get('/explore', getAllPosts);

export default router;
