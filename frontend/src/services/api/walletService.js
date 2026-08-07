import apiClient from './apiClient';

export const walletService = {
  getWallet: async (publicKey) => {
    const data = await apiClient.get('/wallet', { params: { publicKey } });
    return data;
  },

  sendPayment: async (paymentData) => {
    const data = await apiClient.post('/wallet/send', paymentData);
    return data;
  },
};

export default walletService;
