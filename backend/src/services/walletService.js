import { getWalletDetails } from './stellar/walletService.js';

const DEFAULT_VAULT_PUBLIC_KEY = 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE';

export const getWalletService = async (publicKey = DEFAULT_VAULT_PUBLIC_KEY) => {
  return await getWalletDetails(publicKey);
};

export const sendPaymentService = async (paymentData) => {
  return {
    success: true,
    txHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    amount: paymentData.amount,
    asset: paymentData.asset,
    recipient: paymentData.recipient,
    timestamp: new Date().toISOString(),
    fee: '0.00001 XLM',
  };
};
