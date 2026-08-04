import apiClient from './apiClient';

export const sorobanService = {
  registerDeviceOnChain: async (deviceData) => {
    return await apiClient.post('/soroban/register-device', deviceData);
  },

  createSettlementOnChain: async (settlementData) => {
    return await apiClient.post('/soroban/create-settlement', settlementData);
  },

  executePaymentOnChain: async (settlementId) => {
    return await apiClient.post('/soroban/execute-payment', { settlementId });
  },

  getSettlementsOnChain: async () => {
    return await apiClient.get('/soroban/settlements');
  },

  getDeviceOnChain: async (id) => {
    return await apiClient.get(`/soroban/device/${id}`);
  },

  getSorobanHealth: async () => {
    return await apiClient.get('/soroban/health');
  },
};

export default sorobanService;
