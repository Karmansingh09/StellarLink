import { getWalletService, sendPaymentService } from '../services/walletService.js';

export const getWallet = async (req, res) => {
  try {
    const data = await getWalletService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sendPayment = async (req, res) => {
  try {
    const data = await sendPaymentService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
