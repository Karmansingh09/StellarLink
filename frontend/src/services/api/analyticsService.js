import apiClient from './apiClient';

export const analyticsService = {
  getMetrics: async () => {
    return await apiClient.get('/analytics');
  },
};

export default analyticsService;
