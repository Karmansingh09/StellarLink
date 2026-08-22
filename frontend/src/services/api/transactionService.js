import apiClient from './apiClient';

export const transactionService = {
  getTransactions: async (params = {}) => {
    try {
      const res = await apiClient.get('/transactions', { params });
      return Array.isArray(res) ? res : (res?.data || []);
    } catch (error) {
      console.error('[transactionService] Error fetching transactions:', error);
      return [];
    }
  },
};

export default transactionService;
