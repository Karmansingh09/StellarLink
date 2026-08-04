import { Router } from 'express';
import {
  registerDevice,
  createSettlement,
  executePayment,
  getSettlements,
  getDeviceOnChain,
  getHealth,
} from '../controllers/sorobanController.js';

const router = Router();

router.post('/register-device', registerDevice);
router.post('/create-settlement', createSettlement);
router.post('/execute-payment', executePayment);
router.get('/settlements', getSettlements);
router.get('/device/:id', getDeviceOnChain);
router.get('/health', getHealth);

export default router;
