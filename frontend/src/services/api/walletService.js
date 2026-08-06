import apiClient from './apiClient';

export const walletService = {
  getWallet: async (publicKey) => {
    try {
      return await apiClient.get('/wallet', { params: { publicKey } });
    } catch (error) {
      return {
        address: publicKey || 'GD6WTVMWBX227SYP5T5GZ2H4P5V2K3L4M5N6P7Q8R9S0T1U2V3W4X5Y6',
        balance: '10,000.00 XLM',
        usdValue: '$1,200.00 USD',
        assets: [],
      };
    }
  },

  sendPayment: async (paymentData) => {
    return await apiClient.post('/wallet/send', paymentData);
  },
};

export default walletService;
