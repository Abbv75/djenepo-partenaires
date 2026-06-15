import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceCategoryKeys } from './queryKeys';
import {
  fetchServiceCategories,
  fetchServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory
} from './serviceCategories';

export function useServiceCategories() {
  return useQuery({
    queryKey: serviceCategoryKeys.list(),
    queryFn: fetchServiceCategories,
  });
}

export function useServiceCategory(id: number) {
  return useQuery({
    queryKey: serviceCategoryKeys.detail(id),
    queryFn: () => fetchServiceCategory(id),
    enabled: !!id,
  });
}

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createServiceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
    },
  });
}

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateServiceCategory>[1] }) =>
      updateServiceCategory(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.detail(id) });
    },
  });
}

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteServiceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceCategoryKeys.list() });
    },
  });
}
