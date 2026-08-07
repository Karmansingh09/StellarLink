import apiClient from './apiClient';

export const dashboardService = {
  getMetrics: async () => {
    return await apiClient.get('/dashboard');
  },
};

export default dashboardService;
