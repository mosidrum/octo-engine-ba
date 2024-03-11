import express from 'express';
import {
	adminUser,
	loginUser,
	registerUser,
	updateProfile,
	updateProfilePicture,
	userProfile,
} from '../controllers/userControllers.js';
import { authGuard } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);
router.get('/admin/:id', authGuard, adminUser);
router.put('/updateProfile', authGuard, updateProfile)
router.put('/updateProfilePicture', authGuard, updateProfilePicture)

export default router;
