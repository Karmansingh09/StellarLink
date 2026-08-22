import { useQuery } from '@tanstack/react-query';
import analyticsService from '../services/api/analyticsService';

export function useAnalytics(params = {}) {
  return useQuery({
    queryKey: ['analyticsMetrics', params],
    queryFn: () => analyticsService.getMetrics(params),
    staleTime: 10000,
    refetchInterval: 12000,
  });
}

export default useAnalytics;
