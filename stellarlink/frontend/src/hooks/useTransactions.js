import { useQuery } from '@tanstack/react-query';
import transactionService from '../services/api/transactionService';

export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionService.getTransactions(params),
    staleTime: 15000,
    refetchInterval: 20000,
  });
}

export default useTransactions;
