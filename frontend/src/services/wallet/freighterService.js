import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetwork,
  signTransaction,
} from '@stellar/freighter-api';

export const freighterService = {
  /**
   * Check if Freighter extension is installed in user's browser.
   */
  isFreighterInstalled: async () => {
    try {
      const res = await isConnected();
      return Boolean(res?.isConnected || res);
    } catch {
      return false;
    }
  },

  /**
   * Connect to Freighter wallet and retrieve public key.
   */
  connect: async () => {
    const installed = await freighterService.isFreighterInstalled();
    if (!installed) {
      throw new Error(
        'Freighter extension not detected. Please install Freighter from https://www.freighter.app/'
      );
    }

    try {
      const accessObj = await requestAccess();
      if (accessObj?.error) {
        throw new Error(accessObj.error || 'Connection request rejected');
      }

      const addressResult = await getAddress();
      const address = addressResult?.address || addressResult;

      if (!address || typeof address !== 'string' || !address.startsWith('G')) {
        throw new Error('Could not retrieve a valid Stellar public key from Freighter');
      }

      // Check Network environment
      let network = 'TESTNET';
      try {
        const netResult = await getNetwork();
        network = netResult?.network || netResult || 'TESTNET';
      } catch {
        // Default to TESTNET
      }

      return {
        publicKey: address,
        network,
      };
    } catch (err) {
      if (err?.message?.includes('User declined') || err?.message?.includes('rejected')) {
        throw new Error('Freighter connection request was rejected by user.');
      }
      throw new Error(err.message || 'Failed to connect to Freighter wallet.');
    }
  },

  /**
   * Check if site is already allowed
   */
  checkAllowed: async () => {
    try {
      const allowed = await isAllowed();
      return Boolean(allowed?.isAllowed || allowed);
    } catch {
      return false;
    }
  },

  /**
   * Sign transaction envelope XDR via Freighter Extension
   */
  signTransaction: async (transactionXdr, networkPassphrase) => {
    try {
      const res = await signTransaction({
        transactionXdr,
        networkPassphrase: networkPassphrase || 'Test SDF Network ; July 2015',
        network: 'TESTNET',
      });

      const signedXdr = res?.signedTxXdr || res?.signedXdr || res?.signedTransaction || res;
      if (!signedXdr || typeof signedXdr !== 'string') {
        throw new Error('Freighter signing returned invalid transaction envelope XDR');
      }
      return signedXdr;
    } catch (err) {
      if (err?.message?.includes('User declined') || err?.message?.includes('rejected') || err?.message?.includes('User canceled')) {
        throw new Error('Transaction signature request was declined in Freighter extension.');
      }
      throw new Error(err.message || 'Freighter signature failed.');
    }
  },
};

export default freighterService;
