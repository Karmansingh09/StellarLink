import apiClient from './apiClient';

export const deviceService = {
  getDevices: async (params = {}) => {
    try {
      return await apiClient.get('/devices', { params });
    } catch (error) {
      return [];
    }
  },

  registerDevice: async (deviceData) => {
    return await apiClient.post('/devices', deviceData);
  },
};

export default deviceService;
