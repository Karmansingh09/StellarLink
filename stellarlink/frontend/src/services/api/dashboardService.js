import apiClient from './apiClient';

export const dashboardService = {
  getMetrics: async () => {
    try {
      return await apiClient.get('/dashboard');
    } catch (error) {
      // Fallback mock response if backend offline
      return {
        totalSettlement: 48200000,
        activeDevices: 1284,
        successRate: 99.98,
        averageFinality: 482,
        networkVolume: '$48.2M',
        settlementGrowth: '+8.4%',
      };
    }
  },
};

export default dashboardService;
