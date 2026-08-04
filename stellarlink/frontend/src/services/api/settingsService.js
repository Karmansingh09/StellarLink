import apiClient from './apiClient';

export const settingsService = {
  getSettings: async () => {
    try {
      return await apiClient.get('/settings');
    } catch (error) {
      return {
        autoSettle: true,
        notifications: true,
        sorobanFailover: true,
        networkPassphrase: 'Public Global Stellar Network ; September 2015',
        maxFeeLimit: '0.00001',
        alertEmail: 'admin@stellarlink.io',
      };
    }
  },

  updateSettings: async (settingsData) => {
    return await apiClient.put('/settings', settingsData);
  },
};

export default settingsService;
