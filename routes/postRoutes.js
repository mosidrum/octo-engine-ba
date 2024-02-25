import express from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import { createPost, updatePost } from '../controllers/postControllers.js';
import { adminGuard } from '../middleware/adminGuard.js';

const router = express.Router();
router.post("/", authGuard, adminGuard, createPost )
router.put("/:slug", authGuard, adminGuard, updatePost )

export default router;
