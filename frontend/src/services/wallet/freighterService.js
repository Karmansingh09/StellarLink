import freighterApi, {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetwork,
  signTransaction as freighterSignTransaction,
} from '@stellar/freighter-api';

const STELLAR_TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';

export const freighterService = {
  /**
   * Check if Freighter extension is installed in user's browser.
   */
  isFreighterInstalled: async () => {
    try {
      const fn = isConnected || freighterApi?.isConnected;
      if (!fn) return false;
      const res = await fn();
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
      const reqFn = requestAccess || freighterApi?.requestAccess;
      const getAddrFn = getAddress || freighterApi?.getAddress;

      const accessObj = await reqFn();
      if (accessObj?.error) {
        throw new Error(accessObj.error || 'Connection request rejected');
      }

      const addressResult = await getAddrFn();
      const address = addressResult?.address || addressResult;

      if (!address || typeof address !== 'string' || !address.startsWith('G')) {
        throw new Error('Could not retrieve a valid Stellar public key from Freighter');
      }

      // Check Network environment
      let network = 'TESTNET';
      try {
        const getNetFn = getNetwork || freighterApi?.getNetwork;
        if (getNetFn) {
          const netResult = await getNetFn();
          network = netResult?.network || netResult || 'TESTNET';
        }
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
      const fn = isAllowed || freighterApi?.isAllowed;
      if (!fn) return false;
      const allowed = await fn();
      return Boolean(allowed?.isAllowed || allowed);
    } catch {
      return false;
    }
  },

  /**
   * Sign transaction envelope XDR via Freighter Extension.
   * Note: signTransaction signature in @stellar/freighter-api is signTransaction(transactionXdr, opts).
   */
  signTransaction: async (transactionXdr, networkPassphrase) => {
    if (!transactionXdr || typeof transactionXdr !== 'string') {
      throw new Error('Invalid transaction XDR string provided for Freighter signing.');
    }

    const targetPassphrase = networkPassphrase || STELLAR_TESTNET_PASSPHRASE;
    const signFn = freighterSignTransaction || freighterApi?.signTransaction;

    if (!signFn) {
      throw new Error('Freighter signTransaction API method not available.');
    }

    try {
      // Call signTransaction(transactionXdr, { networkPassphrase, network })
      const res = await signFn(transactionXdr, {
        networkPassphrase: targetPassphrase,
        network: 'TESTNET',
      });

      if (res?.error) {
        const errMsg = typeof res.error === 'string' ? res.error : res.error.message || 'Freighter signing declined or failed';
        throw new Error(errMsg);
      }

      const signedXdr = res?.signedTxXdr || res?.signedXdr || res?.signedTransaction || (typeof res === 'string' ? res : null);

      if (!signedXdr || typeof signedXdr !== 'string') {
        throw new Error('Freighter signing returned invalid transaction envelope XDR');
      }

      return signedXdr;
    } catch (err) {
      if (
        err?.message?.includes('User declined') ||
        err?.message?.includes('rejected') ||
        err?.message?.includes('User canceled') ||
        err?.message?.includes('Declined')
      ) {
        throw new Error('Transaction signature request was declined in Freighter extension.');
      }
      throw new Error(err.message || 'Freighter signature failed.');
    }
  },
};

export default freighterService;
