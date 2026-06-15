import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceKeys } from './queryKeys';
import { fetchServices, createService, updateService, deleteService } from './services';

export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: fetchServices,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateService>[1] }) =>
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}
