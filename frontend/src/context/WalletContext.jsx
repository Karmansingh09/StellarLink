import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import walletService from '../services/api/walletService';
import freighterService from '../services/wallet/freighterService';

const DEFAULT_TESTNET_PUBLIC_KEY = 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const queryClient = useQueryClient();

  const [activePublicKey, setActivePublicKey] = useState(() => {
    return localStorage.getItem('stellarlink_active_public_key') || DEFAULT_TESTNET_PUBLIC_KEY;
  });

  const [activeSecretKey, setActiveSecretKey] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const [isFreighterConnected, setIsFreighterConnected] = useState(() => {
    return localStorage.getItem('stellarlink_freighter_connected') === 'true';
  });

  const [freighterAddress, setFreighterAddress] = useState(() => {
    return localStorage.getItem('stellarlink_freighter_address') || '';
  });

  const [isConnectingFreighter, setIsConnectingFreighter] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const syncFreighterState = async () => {
      if (localStorage.getItem('stellarlink_freighter_connected') === 'true') {
        const isAllowed = await freighterService.checkAllowed();
        if (isAllowed) {
          try {
            const { getAddress } = await import('@stellar/freighter-api');
            const res = await getAddress();
            const addr = res?.address || res;
            if (isMounted && addr && typeof addr === 'string' && addr.startsWith('G')) {
              setFreighterAddress(addr);
              setIsFreighterConnected(true);
              const currentActive = localStorage.getItem('stellarlink_active_public_key');
              if (!currentActive || currentActive === DEFAULT_TESTNET_PUBLIC_KEY) {
                setActivePublicKey(addr);
                localStorage.setItem('stellarlink_active_public_key', addr);
              }
              localStorage.setItem('stellarlink_freighter_address', addr);
            }
          } catch (e) {
            console.warn('[WalletContext] Failed to retrieve address from connected Freighter:', e.message);
          }
        } else if (isMounted) {
          setIsFreighterConnected(false);
          setFreighterAddress('');
          localStorage.removeItem('stellarlink_freighter_connected');
          localStorage.removeItem('stellarlink_freighter_address');
        }
      }
    };
    syncFreighterState();

    const handleFocus = () => {
      syncFreighterState();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Single Source of Truth TanStack Query for Wallet Data
  const {
    data: walletData,
    isLoading: loading,
    refetch: refreshWallet,
  } = useQuery({
    queryKey: ['wallet', activePublicKey],
    queryFn: async () => {
      console.log('[WalletContext Query] Fetching wallet for key:', activePublicKey);
      const data = await walletService.getWallet(activePublicKey);
      console.log('[WalletContext Query] Received Backend Wallet Data:', data);
      return data;
    },
    enabled: Boolean(activePublicKey),
    staleTime: 5000,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const connectWallet = async () => {
    setIsConnectingFreighter(true);
    try {
      const result = await freighterService.connect();
      const pubKey = result.publicKey;
      console.log('[WalletContext] Connected Freighter Key:', pubKey);
      
      setFreighterAddress(pubKey);
      setIsFreighterConnected(true);
      setActivePublicKey(pubKey);
      setActiveSecretKey('');
      
      localStorage.setItem('stellarlink_freighter_connected', 'true');
      localStorage.setItem('stellarlink_freighter_address', pubKey);
      localStorage.setItem('stellarlink_active_public_key', pubKey);

      await queryClient.invalidateQueries({ queryKey: ['wallet'] });
      await queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      return result;
    } catch (err) {
      console.error('[WalletContext] Connect Freighter Error:', err);
      throw err;
    } finally {
      setIsConnectingFreighter(false);
    }
  };

  const disconnectWallet = async () => {
    console.log('[WalletContext] Disconnecting Freighter Wallet...');
    setIsFreighterConnected(false);
    setFreighterAddress('');
    setActivePublicKey(DEFAULT_TESTNET_PUBLIC_KEY);
    setActiveSecretKey('');

    localStorage.removeItem('stellarlink_freighter_connected');
    localStorage.removeItem('stellarlink_freighter_address');
    localStorage.setItem('stellarlink_active_public_key', DEFAULT_TESTNET_PUBLIC_KEY);

    await queryClient.invalidateQueries({ queryKey: ['wallet'] });
    await queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
  };

  const setDevKeypair = (publicKey, secretKey) => {
    console.log('[WalletContext] Setting Dev Keypair:', publicKey);
    setIsFreighterConnected(false);
    setFreighterAddress('');
    setActivePublicKey(publicKey);
    setActiveSecretKey(secretKey);

    localStorage.removeItem('stellarlink_freighter_connected');
    localStorage.removeItem('stellarlink_freighter_address');
    localStorage.setItem('stellarlink_active_public_key', publicKey);

    queryClient.invalidateQueries({ queryKey: ['wallet'] });
    queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
    queryClient.invalidateQueries({ queryKey: ['analyticsMetrics'] });
  };

  const value = {
    walletData,
    publicKey: activePublicKey,
    loading,
    refreshWallet,
    connectWallet,
    disconnectWallet,
    setDevKeypair,
    isFreighterConnected,
    freighterAddress,
    isConnectingFreighter,
    activeSecretKey,
    showSecret,
    setShowSecret,
  };

  console.log('[WalletContext State] Current Context Value:', {
    publicKey: activePublicKey,
    balance: walletData?.balance,
    unfunded: walletData?.unfunded,
    loading,
    isFreighterConnected,
  });

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}

export default WalletContext;
