import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../constant/AxiosInstance';
import { serviceCategoryKeys } from '../constant/queryKeys';
import type { ServiceCategory } from '../types';

export function useServiceCategories() {
  return useQuery({
    queryKey: serviceCategoryKeys.list(),
    queryFn: async (): Promise<ServiceCategory[]> => {
      const res = await api.get('/service-categories');
      return res.data.data;
    },
  });
}

export function useServiceCategory(id: number) {
  return useQuery({
    queryKey: serviceCategoryKeys.detail(id),
    queryFn: async (): Promise<ServiceCategory> => {
      const res = await api.get(`/service-categories/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ServiceCategory>): Promise<ServiceCategory> => {
      const res = await api.post('/service-categories', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
    },
  });
}

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServiceCategory> }): Promise<ServiceCategory> => {
      const res = await api.put(`/service-categories/${id}`, data);
      return res.data.data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.detail(id) });
    },
  });
}

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/service-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
    },
  });
}
