import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

export const getTransactionsService = async (query = {}) => {
  const publicKey = query.publicKey || process.env.STELLAR_PUBLIC_KEY || 'GDYMFFFUL776BOAONOZZCAKQD2P5H2UCJ4UJTUUVRQIJUWCMBRS5U6MG';
  
  let realTxs = [];
  try {
    const paymentRecords = await server.payments().forAccount(publicKey).order('desc').limit(50).call();
    
    realTxs = paymentRecords.records.map((rec) => {
      const isCreate = rec.type === 'create_account';
      const rawAmt = isCreate ? rec.starting_balance : (rec.amount || '0.00');
      const numericAmt = parseFloat(rawAmt) || 0;
      const formattedAmt = `+${numericAmt.toFixed(2)} XLM`;
      const dateObj = rec.created_at ? new Date(rec.created_at) : new Date();
      const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const txHash = rec.transaction_hash || rec.id;
      const shortId = txHash ? `tx_${txHash.substring(0, 10)}` : rec.id;
      
      return {
        id: rec.id,
        txId: shortId,
        hash: txHash,
        contractId: 'CC3J4M7R9K2P...SOROBAN',
        device: isCreate ? 'Stellar Friendbot' : 'Stellar Terminal',
        amount: formattedAmt,
        asset: rec.asset_code || 'XLM',
        status: rec.transaction_successful === false ? 'failed' : 'completed',
        timestamp: formattedTime,
        rawDate: rec.created_at,
        wallet: rec.source_account || publicKey,
      };
    });
  } catch (err) {
    console.error('[transactionService] Failed to query Horizon RPC:', err.message);
  }

  let result = [...realTxs];

  if (query.search) {
    const s = query.search.toLowerCase();
    result = result.filter(
      (tx) =>
        (tx.txId && tx.txId.toLowerCase().includes(s)) ||
        (tx.hash && tx.hash.toLowerCase().includes(s)) ||
        (tx.device && tx.device.toLowerCase().includes(s)) ||
        (tx.wallet && tx.wallet.toLowerCase().includes(s))
    );
  }

  if (query.status && query.status !== 'all') {
    result = result.filter((tx) => tx.status.toLowerCase() === query.status.toLowerCase());
  }

  if (query.device && query.device !== 'all') {
    result = result.filter((tx) => tx.device.toLowerCase() === query.device.toLowerCase());
  }

  return result;
};
