import express from 'express';
import { askSipBot } from '../controllers/aiController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST route matching delivery spec requirements
router.post('/chat', requireAuth, askSipBot);

export default router;