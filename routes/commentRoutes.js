import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import {
	createComment,
	deleteComment,
	updateComment,
} from '../controllers/commentControllers.js';

const router = express.Router();
router
	.route('/')
	.post(authGuard, createComment)
	.delete(authGuard, deleteComment);
router.put('/updateComment', authGuard, updateComment);

export default router;
