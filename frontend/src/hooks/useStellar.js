import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stellarService from '../services/api/stellarService';
import { useWalletContext } from '../context/WalletContext';

export function useStellarWallet() {
  const { walletData, loading, refreshWallet, publicKey } = useWalletContext();
  return { data: walletData, isLoading: loading, refetch: refreshWallet, publicKey };
}

export function useStellarTransactions(publicKey) {
  const { publicKey: contextKey } = useWalletContext();
  const activeKey = publicKey || contextKey;
  return useQuery({
    queryKey: ['stellarTransactions', activeKey],
    queryFn: () => (activeKey ? stellarService.getTransactions(activeKey) : []),
    enabled: Boolean(activeKey),
    staleTime: 10000,
    refetchInterval: 12000,
  });
}

export function useStellarNetwork() {
  return useQuery({
    queryKey: ['stellarNetwork'],
    queryFn: stellarService.getNetworkStatus,
    staleTime: 15000,
    refetchInterval: 10000,
  });
}

export function useCreateWallet() {
  const queryClient = useQueryClient();
  const { setDevKeypair } = useWalletContext();

  return useMutation({
    mutationFn: stellarService.createWallet,
    onSuccess: (data) => {
      if (data?.publicKey && data?.secretKey) {
        setDevKeypair(data.publicKey, data.secretKey);
      }
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
    },
  });
}

export function useFundWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicKey) => stellarService.fundWallet(publicKey),
    onSuccess: (_, publicKey) => {
      queryClient.invalidateQueries({ queryKey: ['wallet', publicKey] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useSendStellarPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stellarService.sendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
