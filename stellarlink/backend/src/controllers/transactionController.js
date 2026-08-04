import { getTransactionsService } from '../services/transactionService.js';

export const getTransactions = async (req, res) => {
  try {
    const data = await getTransactionsService(req.query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
