export const getWalletService = async () => {
  return {
    address: 'GAK8Z3Y7N9M4P2L1K5J6H8G9F0D3S2A1Q9W8E7R6T5Y4U3I2O1P9L8K7',
    balance: '482,910.00 XLM',
    usdValue: '$57,949.20 USD',
    totalBalanceXLM: 482910,
    availableBalanceXLM: 450000,
    todayVolumeUSD: 124500,
    activeWalletsCount: 1280,
    assets: [
      {
        symbol: 'XLM',
        name: 'Stellar Lumens',
        balance: '482,910.00 XLM',
        usdValue: '$57,949.20',
        change: '+2.4%',
        isPositive: true,
      },
      {
        symbol: 'USDC',
        name: 'Circle USD Coin',
        balance: '12,500.00 USDC',
        usdValue: '$12,500.00',
        change: '+0.0%',
        isPositive: true,
      },
      {
        symbol: 'AQUA',
        name: 'Aquarius Protocol',
        balance: '250,000.00 AQUA',
        usdValue: '$1,250.00',
        change: '+5.8%',
        isPositive: true,
      },
      {
        symbol: 'SLK',
        name: 'StellarLink Token',
        balance: '1,000,000.00 SLK',
        usdValue: '$10,000.00',
        change: '+12.1%',
        isPositive: true,
      },
    ],
  };
};

export const sendPaymentService = async (paymentData) => {
  return {
    success: true,
    txHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    amount: paymentData.amount,
    asset: paymentData.asset,
    recipient: paymentData.recipient,
    timestamp: new Date().toISOString(),
    fee: '0.00001 XLM',
  };
};
