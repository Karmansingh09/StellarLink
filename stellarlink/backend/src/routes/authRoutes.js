import { Router } from 'express';
import { login, getSession } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.get('/session', getSession);

export default router;
