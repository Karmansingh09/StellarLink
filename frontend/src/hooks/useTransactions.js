import { useQuery } from '@tanstack/react-query';
import transactionService from '../services/api/transactionService';

export function useTransactions(params = {}) {
  const activePublicKey = typeof window !== 'undefined'
    ? localStorage.getItem('stellarlink_active_public_key') || 'GDYMFFFUL776BOAONOZZCAKQD2P5H2UCJ4UJTUUVRQIJUWCMBRS5U6MG'
    : 'GDYMFFFUL776BOAONOZZCAKQD2P5H2UCJ4UJTUUVRQIJUWCMBRS5U6MG';

  return useQuery({
    queryKey: ['transactions', activePublicKey, params],
    queryFn: () => transactionService.getTransactions({ publicKey: activePublicKey, ...params }),
    staleTime: 15000,
    refetchInterval: 20000,
  });
}

export default useTransactions;
