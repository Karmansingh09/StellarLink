import { Router } from 'express';
import { getWallet, sendPayment } from '../controllers/walletController.js';

const router = Router();

router.get('/', getWallet);
router.post('/send', sendPayment);

export default router;
