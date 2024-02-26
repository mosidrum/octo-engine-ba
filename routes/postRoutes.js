import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import {
	createPost,
	deletePost,
	getAllPost,
	getPost,
	updatePost,
} from '../controllers/postControllers.js';
import { adminGuard } from '../middleware/adminGuard.js';

const router = express.Router();
router.post('/', authGuard, adminGuard, createPost);
// this way is better to handle routes that uses the same middleware and params instead of duplicating like this
//router.delete('/:slug', authGuard, adminGuard, deletePost);
router
	.route('/:slug')
	.put(authGuard, adminGuard, updatePost)
	.delete(authGuard, adminGuard, deletePost);
router.get('/:slug', getPost);
router.get('/', getAllPost);
export default router;
