import { useQuery } from '@tanstack/react-query';
import analyticsService from '../services/api/analyticsService';

export function useAnalytics(params = {}) {
  const activeKey = params.publicKey || (typeof window !== 'undefined' ? localStorage.getItem('stellarlink_active_public_key') : null);
  const effectiveParams = {
    ...params,
    ...(activeKey ? { publicKey: activeKey } : {}),
  };

  return useQuery({
    queryKey: ['analyticsMetrics', effectiveParams],
    queryFn: () => analyticsService.getMetrics(effectiveParams),
    staleTime: 10000,
    refetchInterval: 12000,
  });
}

export default useAnalytics;
