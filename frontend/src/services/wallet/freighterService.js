import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetwork,
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
};

export default freighterService;
