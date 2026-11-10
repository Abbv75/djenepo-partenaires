import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../constant/AxiosInstance';
import { serviceKeys } from '../constant/queryKeys';
import type { Service } from '../types';

export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: async (): Promise<Service[]> => {
      const res = await api.get('/services');
      return res.data.data;
    },
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Service>): Promise<Service> => {
      const res = await api.post('/services', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Service> }): Promise<Service> => {
      const res = await api.put(`/services/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.list() });
    },
  });
}
