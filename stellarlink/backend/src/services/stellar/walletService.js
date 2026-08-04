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
          balance: parseFloat(b.balance).toLocaleString('en-US', { minimumFractionDigits: 2 }),
          rawBalance: b.balance,
        };
      }
      return {
        asset: `${b.asset_code} (${b.asset_issuer.substring(0, 4)}...)`,
        symbol: b.asset_code,
        balance: parseFloat(b.balance).toLocaleString('en-US', { minimumFractionDigits: 2 }),
        rawBalance: b.balance,
      };
    });

    const nativeBalanceObj = account.balances.find((b) => b.asset_type === 'native');
    const nativeVal = nativeBalanceObj ? parseFloat(nativeBalanceObj.balance) : 0;

    return {
      publicKey: account.id,
      sequence: account.sequence,
      balances: formattedBalances,
      totalXLM: nativeVal.toLocaleString('en-US', { minimumFractionDigits: 2 }),
      usdEquivalent: (nativeVal * 0.12).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      subentryCount: account.subentry_count,
    };
  } catch (error) {
    // If account not yet funded / not found on ledger
    if (error.response?.status === 404) {
      return {
        publicKey,
        sequence: '0',
        balances: [{ asset: 'XLM Native', symbol: 'XLM', balance: '0.00', rawBalance: '0' }],
        totalXLM: '0.00',
        usdEquivalent: '$0.00 USD',
        unfunded: true,
      };
    }
    throw error;
  }
};
