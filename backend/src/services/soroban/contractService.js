export const CONTRACT_ADDRESSES = {
  deviceRegistry: process.env.SOROBAN_DEVICE_REGISTRY_ID || 'CCAOQSK25VUZUJOG6CDWHWKCZUDC3Q5Y6L6VDBAVF6OYPDM6PDY2DKET',
  devicePermissions: process.env.SOROBAN_DEVICE_PERMISSIONS_ID || 'CCCW2NOIUYK33WIDCR3AG5J7J6PEZ24EFP532CNN7X3SEGMJ3SQHUWLL',
  paymentEscrow: process.env.SOROBAN_PAYMENT_ESCROW_ID || 'CBDSY6EOD3H2ROFFNFZGBQ5F3PV4NEM3ZTUYRRHGV2PL65LA4SPBFZDV',
  settlementManager: process.env.SOROBAN_SETTLEMENT_MANAGER_ID || 'CBOHOTLZTV5LF2VWP3YJ5WCPKA2WIINIV7SCHCRSRAB6Q234ONCZHXHT',
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
