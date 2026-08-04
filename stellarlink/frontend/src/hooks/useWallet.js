import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import walletService from '../services/api/walletService';

export function useWallet() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['wallet'],
    queryFn: walletService.getWallet,
    staleTime: 30000,
  });

  const sendPaymentMutation = useMutation({
    mutationFn: walletService.sendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return {
    ...query,
    sendPayment: sendPaymentMutation.mutateAsync,
    isSending: sendPaymentMutation.isPending,
  };
}

export default useWallet;
