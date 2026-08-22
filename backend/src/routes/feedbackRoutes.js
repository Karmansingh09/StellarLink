import { Router } from 'express';
import { submitFeedback, listFeedbacks, exportFeedbackCSV } from '../controllers/feedbackController.js';

const router = Router();

router.get('/', listFeedbacks);
router.post('/', submitFeedback);
router.get('/export', exportFeedbackCSV);

export default router;
