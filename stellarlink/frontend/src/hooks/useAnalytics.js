import { useQuery } from '@tanstack/react-query';
import analyticsService from '../services/api/analyticsService';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analyticsMetrics'],
    queryFn: analyticsService.getMetrics,
    staleTime: 30000,
  });
}

export default useAnalytics;
