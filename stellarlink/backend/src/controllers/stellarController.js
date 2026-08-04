import { generateWallet, fundWalletWithFriendbot, getWalletDetails } from '../services/stellar/walletService.js';
import { submitXLMPayment, fetchTransactionHistory } from '../services/stellar/transactionService.js';
import { getNetworkHealth } from '../services/stellar/networkService.js';

export const createWallet = async (req, res) => {
  try {
    const data = await generateWallet();
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const fundWallet = async (req, res) => {
  try {
    const { publicKey } = req.body;
    if (!publicKey) {
      return res.status(400).json({ success: false, error: 'publicKey is required' });
    }
    const data = await fundWalletWithFriendbot(publicKey);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBalance = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const data = await getWalletDetails(publicKey);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const sendPayment = async (req, res) => {
  try {
    const { senderSecret, destinationPublic, amount, memoText } = req.body;
    if (!senderSecret || !destinationPublic || !amount) {
      return res.status(400).json({ success: false, error: 'senderSecret, destinationPublic, and amount are required' });
    }
    const data = await submitXLMPayment({ senderSecret, destinationPublic, amount, memoText });
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const data = await fetchTransactionHistory(publicKey);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNetwork = async (req, res) => {
  try {
    const data = await getNetworkHealth();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
