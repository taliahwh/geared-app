import express from 'express';

import { getAllPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/explore', getAllPosts);

export default router;
