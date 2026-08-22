import * as StellarSdk from '@stellar/stellar-sdk';
import { server, networkPassphrase } from './stellarService.js';

/**
 * Build an unsigned payment XDR for client-side signing (e.g. Freighter extension).
 * Automatically detects whether destination exists on Testnet; if 404, builds createAccount operation.
 */
export const buildPaymentXdrService = async ({ sourcePublicKey, destinationPublic, amount, memoText }) => {
  if (!sourcePublicKey || !destinationPublic || !amount) {
    throw new Error('sourcePublicKey, destinationPublic, and amount are required to build XDR');
  }

  // 1. Verify source account exists on Horizon
  let sourceAccount;
  try {
    sourceAccount = await server.loadAccount(sourcePublicKey);
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error(`Source account (${sourcePublicKey.substring(0, 8)}...) is not funded on Stellar Testnet. Please click 'Fund Friendbot' in Wallet management to activate account.`);
    }
    throw new Error(`Failed to load source account: ${err.message}`);
  }

  // 2. Check if destination account exists on Horizon
  let destinationExists = false;
  try {
    await server.loadAccount(destinationPublic);
    destinationExists = true;
  } catch (err) {
    if (err.response?.status === 404) {
      destinationExists = false;
    } else {
      console.warn('[TransactionService] Destination lookup warning:', err.message);
    }
  }

  // 3. Build Operation (createAccount vs payment)
  let op;
  if (!destinationExists) {
    op = StellarSdk.Operation.createAccount({
      destination: destinationPublic,
      startingBalance: String(amount),
    });
  } else {
    op = StellarSdk.Operation.payment({
      destination: destinationPublic,
      asset: StellarSdk.Asset.native(),
      amount: String(amount),
    });
  }

  // 4. Build Transaction Envelope
  let txBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE || '100',
    networkPassphrase,
  }).addOperation(op);

  if (memoText && String(memoText).trim()) {
    txBuilder = txBuilder.addMemo(StellarSdk.Memo.text(String(memoText).trim().substring(0, 28)));
  }

  const tx = txBuilder.setTimeout(60).build();
  const xdr = tx.toXDR();

  return {
    success: true,
    xdr,
    networkPassphrase,
    destinationExists,
    operationType: destinationExists ? 'payment' : 'createAccount',
  };
};

/**
 * Submit client-signed transaction XDR to Stellar Horizon RPC.
 */
export const submitSignedXdrService = async ({ signedXdr }) => {
  if (!signedXdr) {
    throw new Error('signedXdr is required for transaction submission');
  }

  try {
    const tx = StellarSdk.TransactionBuilder.fromXDR(signedXdr, networkPassphrase);
    const result = await server.submitTransaction(tx);

    return {
      success: true,
      hash: result.hash,
      ledger: result.ledger,
      successful: result.successful,
      createdAt: new Date().toISOString(),
      envelopeXdr: result.envelope_xdr,
    };
  } catch (error) {
    console.error('[TransactionService] Horizon XDR Submission Error:', error.response?.data || error.message);
    const codes = error.response?.data?.extras?.result_codes;
    const opCodes = codes?.operations?.join(', ');
    const txCode = codes?.transaction;
    const detail = opCodes || txCode || error.message || 'Transaction submission failed';
    throw new Error(`Stellar Horizon Submission Failed: ${detail}`);
  }
};

/**
 * Submit XLM Payment using sender's secret key (Dev Secret Mode).
 */
export const submitXLMPayment = async ({ senderSecret, destinationPublic, amount, memoText }) => {
  try {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
    const sourcePublicKey = sourceKeypair.publicKey();

    const { xdr } = await buildPaymentXdrService({
      sourcePublicKey,
      destinationPublic,
      amount,
      memoText,
    });

    const tx = StellarSdk.TransactionBuilder.fromXDR(xdr, networkPassphrase);
    tx.sign(sourceKeypair);

    const signedXdr = tx.toXDR();
    return await submitSignedXdrService({ signedXdr });
  } catch (error) {
    console.error('[TransactionService] Payment Execution Error:', error.message);
    throw error;
  }
};

export const fetchTransactionHistory = async (publicKey) => {
  try {
    const txRecords = await server
      .transactions()
      .forAccount(publicKey)
      .order('desc')
      .limit(20)
      .call();

    return txRecords.records.map((tx) => ({
      id: tx.id,
      hash: tx.hash,
      ledger: tx.ledger,
      createdAt: tx.created_at,
      sourceAccount: tx.source_account,
      feePaid: `${(parseInt(tx.fee_charged) / 10000000).toFixed(5)} XLM`,
      operationCount: tx.operation_count,
      memo: tx.memo || '—',
      successful: tx.successful,
      explorerUrl: `https://stellar.expert/explorer/testnet/tx/${tx.hash}`,
    }));
  } catch (error) {
    console.error('Error fetching Stellar transaction history:', error.message);
    return [];
  }
};
