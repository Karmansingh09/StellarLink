import { useMutation, useQueryClient } from '@tanstack/react-query';
import walletService from '../services/api/walletService';
import { useWalletContext } from '../context/WalletContext';

export function useWallet() {
  const queryClient = useQueryClient();
  const context = useWalletContext();

  const sendPaymentMutation = useMutation({
    mutationFn: walletService.sendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['stellarWallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return {
    data: context.walletData,
    walletData: context.walletData,
    publicKey: context.publicKey,
    isLoading: context.loading,
    refetch: context.refreshWallet,
    connectWallet: context.connectWallet,
    disconnectWallet: context.disconnectWallet,
    isFreighterConnected: context.isFreighterConnected,
    freighterAddress: context.freighterAddress,
    sendPayment: sendPaymentMutation.mutateAsync,
    isSending: sendPaymentMutation.isPending,
  };
}

export default useWallet;
