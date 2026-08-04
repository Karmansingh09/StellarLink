import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import settingsService from '../services/api/settingsService';

export function useSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
    staleTime: 60000,
  });

  const updateMutation = useMutation({
    mutationFn: settingsService.updateSettings,
    onSuccess: (newSettings) => {
      queryClient.setQueryData(['settings'], newSettings);
    },
  });

  return {
    ...query,
    updateSettings: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}

export default useSettings;
