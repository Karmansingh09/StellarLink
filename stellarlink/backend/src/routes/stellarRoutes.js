import { Router } from 'express';
import {
  createWallet,
  fundWallet,
  getBalance,
  sendPayment,
  getTransactions,
  getNetwork,
} from '../controllers/stellarController.js';

const router = Router();

router.post('/create-wallet', createWallet);
router.post('/fund-wallet', fundWallet);
router.get('/balance/:publicKey', getBalance);
router.post('/send-payment', sendPayment);
router.get('/transactions/:publicKey', getTransactions);
router.get('/network', getNetwork);

export default router;
