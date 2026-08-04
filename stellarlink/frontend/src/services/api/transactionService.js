import apiClient from './apiClient';

export const transactionService = {
  getTransactions: async (params = {}) => {
    try {
      return await apiClient.get('/transactions', { params });
    } catch (error) {
      return [];
    }
  },
};

export default transactionService;
