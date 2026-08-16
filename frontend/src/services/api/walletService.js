import apiClient from './apiClient';

export const walletService = {
  getWallet: async (publicKey) => {
    try {
      const data = await apiClient.get('/wallet', { params: { publicKey } });
      if (data && (data.totalXLM || data.balance)) {
        return data;
      }
    } catch (apiError) {
      console.warn('[WalletService] Backend API unavailable, falling back to direct Horizon lookup:', apiError.message);
    }

    // Direct Client-Side Horizon RPC Fallback
    try {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`);
      if (res.status === 404) {
        return {
          publicKey,
          address: publicKey,
          sequence: '0',
          balances: [{ asset: 'XLM Native', symbol: 'XLM', balance: '0.00 XLM', rawBalance: '0', change: 'Unfunded', isPositive: false }],
          assets: [{ asset: 'XLM Native', symbol: 'XLM', balance: '0.00 XLM', rawBalance: '0', change: 'Unfunded', isPositive: false }],
          totalXLM: '0.00',
          availableXLM: '0.00',
          balance: '0.00 XLM',
          availableBalance: '0.00 XLM',
          rawTotalXLM: 0,
          rawAvailableXLM: 0,
          usdEquivalent: '$0.00 USD',
          usdValue: '$0.00 USD',
          subentryCount: 0,
          unfunded: true,
        };
      }

      if (!res.ok) {
        throw new Error(`Horizon HTTP ${res.status}`);
      }

      const accountData = await res.json();
      const formattedBalances = accountData.balances.map((b) => {
        if (b.asset_type === 'native') {
          return {
            asset: 'XLM Native',
            symbol: 'XLM',
            balance: `${parseFloat(b.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })} XLM`,
            rawBalance: b.balance,
            change: 'Active',
            isPositive: true,
          };
        }
        return {
          asset: `${b.asset_code} (${b.asset_issuer.substring(0, 4)}...)`,
          symbol: b.asset_code,
          balance: `${parseFloat(b.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })} ${b.asset_code}`,
          rawBalance: b.balance,
          change: 'Active',
          isPositive: true,
        };
      });

      const nativeBalanceObj = accountData.balances.find((b) => b.asset_type === 'native');
      const nativeVal = nativeBalanceObj ? parseFloat(nativeBalanceObj.balance) : 0;
      const subentries = accountData.subentry_count || 0;
      const requiredReserve = 1.0 + (subentries * 0.5);
      const availableVal = Math.max(0, nativeVal - requiredReserve);
      const formattedTotal = nativeVal.toLocaleString('en-US', { minimumFractionDigits: 2 });
      const formattedAvailable = availableVal.toLocaleString('en-US', { minimumFractionDigits: 2 });
      const usdVal = (nativeVal * 0.12).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

      return {
        publicKey: accountData.id,
        address: accountData.id,
        sequence: accountData.sequence,
        balances: formattedBalances,
        assets: formattedBalances,
        totalXLM: formattedTotal,
        availableXLM: formattedAvailable,
        balance: `${formattedTotal} XLM`,
        availableBalance: `${formattedAvailable} XLM`,
        rawTotalXLM: nativeVal,
        rawAvailableXLM: availableVal,
        usdEquivalent: usdVal,
        usdValue: usdVal,
        subentryCount: accountData.subentry_count,
        unfunded: false,
      };
    } catch (horizonError) {
      console.error('[WalletService] Direct Horizon lookup error:', horizonError.message);
      throw horizonError;
    }
  },

  sendPayment: async (paymentData) => {
    const data = await apiClient.post('/wallet/send', paymentData);
    return data;
  },
};

export default walletService;
