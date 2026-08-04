import * as StellarSdk from '@stellar/stellar-sdk';
import { server, networkPassphrase } from './stellarService.js';

export const submitXLMPayment = async ({ senderSecret, destinationPublic, amount, memoText }) => {
  try {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    let txBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE || '100',
      networkPassphrase,
    }).addOperation(
      StellarSdk.Operation.payment({
        destination: destinationPublic,
        asset: StellarSdk.Asset.native(),
        amount: String(amount),
      })
    );

    if (memoText) {
      txBuilder = txBuilder.addMemo(StellarSdk.Memo.text(String(memoText).substring(0, 28)));
    }

    const tx = txBuilder.setTimeout(30).build();
    tx.sign(sourceKeypair);

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
    console.error('Stellar Payment Error:', error.response?.data || error.message);
    const detail =
      error.response?.data?.extras?.result_codes?.operations?.join(', ') ||
      error.message ||
      'Transaction failed';
    throw new Error(`Stellar Tx Failed: ${detail}`);
  }
};

export const fetchTransactionHistory = async (publicKey) => {
  try {
    const txRecords = await server
      .transactions()
      .forAccount(publicKey)
      .order('desc')
      .limit(15)
      .call();

    return txRecords.records.map((tx) => ({
      id: tx.id,
      hash: tx.hash,
      ledger: tx.ledger_attr,
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
