export const SOROBAN_CONTRACTS = {
  deviceRegistry: import.meta.env.VITE_SOROBAN_DEVICE_REGISTRY_ID || 'CCAOQSK25VUZUJOG6CDWHWKCZUDC3Q5Y6L6VDBAVF6OYPDM6PDY2DKET',
  devicePermissions: import.meta.env.VITE_SOROBAN_DEVICE_PERMISSIONS_ID || 'CCCW2NOIUYK33WIDCR3AG5J7J6PEZ24EFP532CNN7X3SEGMJ3SQHUWLL',
  paymentEscrow: import.meta.env.VITE_SOROBAN_PAYMENT_ESCROW_ID || 'CBDSY6EOD3H2ROFFNFZGBQ5F3PV4NEM3ZTUYRRHGV2PL65LA4SPBFZDV',
  settlementManager: import.meta.env.VITE_SOROBAN_SETTLEMENT_MANAGER_ID || 'CBOHOTLZTV5LF2VWP3YJ5WCPKA2WIINIV7SCHCRSRAB6Q234ONCZHXHT',
};

export const STELLAR_NETWORK_CONFIG = {
  network: 'testnet',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  explorerBaseUrl: 'https://stellar.expert/explorer/testnet',
};

export function getExplorerUrl(type, id) {
  if (!id) return STELLAR_NETWORK_CONFIG.explorerBaseUrl;
  switch (type) {
    case 'account':
      return `${STELLAR_NETWORK_CONFIG.explorerBaseUrl}/account/${id}`;
    case 'tx':
      return `${STELLAR_NETWORK_CONFIG.explorerBaseUrl}/tx/${id}`;
    case 'contract':
      return `${STELLAR_NETWORK_CONFIG.explorerBaseUrl}/contract/${id}`;
    case 'ledger':
      return `${STELLAR_NETWORK_CONFIG.explorerBaseUrl}/ledger/${id}`;
    default:
      return STELLAR_NETWORK_CONFIG.explorerBaseUrl;
  }
}

