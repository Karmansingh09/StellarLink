import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import sorobanService from '../services/api/sorobanService';

export function useSorobanSettlements() {
  return useQuery({
    queryKey: ['sorobanSettlements'],
    queryFn: sorobanService.getSettlementsOnChain,
    staleTime: 15000,
    refetchInterval: 15000,
  });
}

export function useSorobanDevice(id) {
  return useQuery({
    queryKey: ['sorobanDevice', id],
    queryFn: () => (id ? sorobanService.getDeviceOnChain(id) : null),
    enabled: Boolean(id),
  });
}

export function useSorobanHealth() {
  return useQuery({
    queryKey: ['sorobanHealth'],
    queryFn: sorobanService.getSorobanHealth,
    staleTime: 20000,
  });
}

export function useRegisterDeviceOnChain() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sorobanService.registerDeviceOnChain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      queryClient.invalidateQueries({ queryKey: ['sorobanDevice'] });
    },
  });
}

export function useCreateSettlementOnChain() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sorobanService.createSettlementOnChain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sorobanSettlements'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useExecutePaymentOnChain() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sorobanService.executePaymentOnChain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sorobanSettlements'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
}
