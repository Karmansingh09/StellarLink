import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import walletService from '../services/api/walletService';

export function useWallet(publicKey) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['wallet', publicKey],
    queryFn: () => walletService.getWallet(publicKey),
    staleTime: 10000,
    refetchInterval: 12000,
  });

  const sendPaymentMutation = useMutation({
    mutationFn: walletService.sendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
    },
  });

  return {
    ...query,
    sendPayment: sendPaymentMutation.mutateAsync,
    isSending: sendPaymentMutation.isPending,
  };
}

export default useWallet;
