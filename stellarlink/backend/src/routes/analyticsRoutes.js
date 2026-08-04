import { Router } from 'express';
import { getAnalyticsMetrics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', getAnalyticsMetrics);

export default router;
