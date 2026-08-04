import apiClient from './apiClient';

export const stellarService = {
  createWallet: async () => {
    return await apiClient.post('/stellar/create-wallet');
  },

  fundWallet: async (publicKey) => {
    return await apiClient.post('/stellar/fund-wallet', { publicKey });
  },

  getBalance: async (publicKey) => {
    return await apiClient.get(`/stellar/balance/${publicKey}`);
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
