import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stellarService from '../services/api/stellarService';

export function useStellarWallet(publicKey) {
  return useQuery({
    queryKey: ['stellarWallet', publicKey],
    queryFn: () => (publicKey ? stellarService.getBalance(publicKey) : null),
    enabled: Boolean(publicKey),
    staleTime: 5000,
    refetchInterval: 10000,
  });
}

export function useStellarTransactions(publicKey) {
  return useQuery({
    queryKey: ['stellarTransactions', publicKey],
    queryFn: () => (publicKey ? stellarService.getTransactions(publicKey) : []),
    enabled: Boolean(publicKey),
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
  return useMutation({
    mutationFn: stellarService.createWallet,
    onSuccess: (data) => {
      if (data?.publicKey) {
        queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
        queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
      }
    },
  });
}

export function useFundWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicKey) => stellarService.fundWallet(publicKey),
    onSuccess: (_, publicKey) => {
      queryClient.invalidateQueries({ queryKey: ['stellarWallet', publicKey] });
      queryClient.invalidateQueries({ queryKey: ['wallet', publicKey] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions', publicKey] });
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
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
