import express from 'express';

import { signIn } from '../controllers/userController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signIn', signIn);

export default router;
