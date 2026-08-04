import { CONTRACT_ADDRESSES } from './contractService.js';

const registeredOnChainDevices = new Map();

export const registerDeviceOnChain = async ({ deviceId, name, type, region, ownerWallet }) => {
  const record = {
    deviceId: deviceId || `DEV-${Math.floor(1000 + Math.random() * 9000)}-X1`,
    name: name || 'EV Charger Node',
    type: type || 'EV Charger',
    region: region || 'Europe West',
    ownerWallet: ownerWallet || 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7',
    contractId: CONTRACT_ADDRESSES.deviceRegistry,
    onChainStatus: 'Active',
    registeredAt: new Date().toISOString(),
    txHash: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
  };

  registeredOnChainDevices.set(record.deviceId, record);
  return record;
};

export const getOnChainDevice = async (deviceId) => {
  if (registeredOnChainDevices.has(deviceId)) {
    return registeredOnChainDevices.get(deviceId);
  }

  return {
    deviceId,
    contractId: CONTRACT_ADDRESSES.deviceRegistry,
    onChainStatus: 'Active',
    ownerWallet: 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7',
    metadataHash: '9f8e7d6c5b4a392810',
    authorizedRoles: ['M2M_PAYMENT_INITIATOR', 'TELEMETRY_PUBLISHER'],
  };
};

export const updateDeviceStatusOnChain = async (deviceId, active) => {
  const record = await getOnChainDevice(deviceId);
  record.onChainStatus = active ? 'Active' : 'Disabled';
  registeredOnChainDevices.set(deviceId, record);
  return record;
};
