import * as StellarSdk from '@stellar/stellar-sdk';
import { server } from './stellarService.js';

export const generateWallet = async () => {
  const pair = StellarSdk.Keypair.random();
  return {
    publicKey: pair.publicKey(),
    secretKey: pair.secret(),
    createdAt: new Date().toISOString(),
  };
};

export const fundWalletWithFriendbot = async (publicKey) => {
  try {
    const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`;
    const response = await fetch(friendbotUrl);
    const data = await response.json();

    if (!response.ok && data.status !== 400) {
      throw new Error(data.detail || 'Friendbot funding failed');
    }

    return {
      success: true,
      message: 'Account funded with 10,000 Testnet XLM via Friendbot',
      publicKey,
    };
  } catch (error) {
    console.error('Friendbot Funding Error:', error.message);
    throw new Error(`Friendbot Funding Failed: ${error.message}`);
  }
};

export const getWalletDetails = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    
    const formattedBalances = account.balances.map((b) => {
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

    const nativeBalanceObj = account.balances.find((b) => b.asset_type === 'native');
    const nativeVal = nativeBalanceObj ? parseFloat(nativeBalanceObj.balance) : 0;
    const subentries = account.subentry_count || 0;
    const requiredReserve = 1.0 + (subentries * 0.5);
    const availableVal = Math.max(0, nativeVal - requiredReserve);
    const formattedTotal = nativeVal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    const formattedAvailable = availableVal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    const usdVal = (nativeVal * 0.12).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return {
      publicKey: account.id,
      address: account.id,
      sequence: account.sequence,
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
      subentryCount: account.subentry_count,
      unfunded: false,
    };
  } catch (error) {
    // If account not yet funded / not found on ledger
    if (error.response?.status === 404 || error.name === 'NotFoundError') {
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
    throw error;
  }
};
