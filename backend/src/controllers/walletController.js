import { getWalletService, sendPaymentService } from '../services/walletService.js';

export const getWallet = async (req, res) => {
  try {
    const publicKey = req.query.publicKey || req.query.address || 'GD6WTVMWBX227SYP5T5GZ2H4P5V2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6';
    const data = await getWalletService(publicKey);
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
