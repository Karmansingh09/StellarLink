import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import stellarService from '../services/api/stellarService';

export function useStellarWallet(publicKey) {
  return useQuery({
    queryKey: ['stellarWallet', publicKey],
    queryFn: () => (publicKey ? stellarService.getBalance(publicKey) : null),
    enabled: Boolean(publicKey),
    staleTime: 10000,
    refetchInterval: 12000,
  });
}

export function useStellarTransactions(publicKey) {
  return useQuery({
    queryKey: ['stellarTransactions', publicKey],
    queryFn: () => (publicKey ? stellarService.getTransactions(publicKey) : []),
    enabled: Boolean(publicKey),
    staleTime: 15000,
    refetchInterval: 15000,
  });
}

export function useStellarNetwork() {
  return useQuery({
    queryKey: ['stellarNetwork'],
    queryFn: stellarService.getNetworkStatus,
    staleTime: 20000,
    refetchInterval: 10000,
  });
}

export function useCreateWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stellarService.createWallet,
    onSuccess: (data) => {
      if (data?.publicKey) {
        queryClient.invalidateQueries({ queryKey: ['stellarWallet', data.publicKey] });
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
    },
  });
}

export function useSendStellarPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: stellarService.sendPayment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarTransactions'] });
    },
  });
}
