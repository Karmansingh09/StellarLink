import apiClient from './apiClient';

export const analyticsService = {
  getMetrics: async (params = {}) => {
    return await apiClient.get('/analytics', { params });
  },
};

export default analyticsService;
