import { Router } from 'express';
import { login, register, logout } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
export default router;
