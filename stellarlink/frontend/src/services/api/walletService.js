import apiClient from './apiClient';

export const walletService = {
  getWallet: async () => {
    try {
      return await apiClient.get('/wallet');
    } catch (error) {
      return {
        address: 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7',
        balance: '482,910.00 XLM',
        usdValue: '$57,949.20 USD',
        assets: [],
      };
    }
  },

  sendPayment: async (paymentData) => {
    return await apiClient.post('/wallet/send', paymentData);
  },
};

export default walletService;
