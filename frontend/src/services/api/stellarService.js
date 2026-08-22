import apiClient from './apiClient';

export const stellarService = {
  createWallet: async () => {
    return await apiClient.post('/stellar/create-wallet');
  },

  fundWallet: async (publicKey) => {
    try {
      return await apiClient.post('/stellar/fund-wallet', { publicKey });
    } catch (err) {
      console.warn('[stellarService] Backend fund-wallet failed, invoking SDF Friendbot directly:', err.message);
      const res = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
      if (!res.ok) {
        throw new Error('Friendbot funding request failed. Address may already be funded or rate limited.');
      }
      return await res.json();
    }
  },

  getBalance: async (publicKey) => {
    return await apiClient.get('/wallet', { params: { publicKey } });
  },

  sendPayment: async ({ senderSecret, destinationPublic, amount, memoText }) => {
    return await apiClient.post('/stellar/send-payment', {
      senderSecret,
      destinationPublic,
      amount,
      memoText,
    });
  },

  getTransactions: async (publicKey) => {
    return await apiClient.get(`/stellar/transactions/${publicKey}`);
  },

  getNetworkStatus: async () => {
    return await apiClient.get('/stellar/network');
  },
};

export default stellarService;
