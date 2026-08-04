export const CONTRACT_ADDRESSES = {
  deviceRegistry: 'CC7X3M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7J6H5F',
  paymentEscrow: 'CD994K12J34H56G78F90D12S34A56Q78W90E12R34T56Y78U90I12O34P5',
  settlementManager: 'CB1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890',
  devicePermissions: 'CA9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210',
};

export const getContractStatus = async (contractId) => {
  return {
    contractId: contractId || CONTRACT_ADDRESSES.deviceRegistry,
    network: 'Stellar Testnet (Soroban RPC)',
    status: 'deployed_active',
    wasmHash: 'b4a8e291c9028e578294a1b02847d891e84a9e8d7c6b5a4f3e2d1c0b9a8f7e6d',
    balanceXLM: '12,500.00 XLM',
    lastExecutedAt: new Date().toISOString(),
  };
};
