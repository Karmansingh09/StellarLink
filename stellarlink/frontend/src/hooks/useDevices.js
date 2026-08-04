import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import deviceService from '../services/api/deviceService';

export function useDevices(params = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['devices', params],
    queryFn: () => deviceService.getDevices(params),
    staleTime: 15000,
  });

  const registerMutation = useMutation({
    mutationFn: deviceService.registerDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });

  return {
    ...query,
    registerDevice: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
  };
}

export default useDevices;
