import { useQuery } from '@tanstack/react-query';
import dashboardService from '../services/api/dashboardService';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: dashboardService.getMetrics,
    staleTime: 30000,
    refetchInterval: 15000,
  });
}

export default useDashboard;
