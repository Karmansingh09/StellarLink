import { getNetworkStatus } from './stellarService.js';

export const getNetworkHealth = async () => {
  return await getNetworkStatus();
};
