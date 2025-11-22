import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { listLogs } from '../controllers/logController.js';
const router = Router();
router.use(auth);
router.get('/', listLogs);
export default router;
