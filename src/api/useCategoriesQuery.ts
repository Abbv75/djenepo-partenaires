import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../constant/AxiosInstance';
import { categoryKeys } from '../constant/queryKeys';
import type { Category } from '../types';

// --- Queries ---

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: async (): Promise<Category[]> => {
      const res = await api.get('/categories.php');
      return res.data.data;
    },
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async (): Promise<Category> => {
      const res = await api.get(`/categories.php?id=${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

// --- Mutations ---

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Category>): Promise<Category> => {
      const res = await api.post('/categories.php', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Category> }): Promise<Category> => {
      const res = await api.put(`/categories.php?id=${id}`, data);
      return res.data.data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/categories.php?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
    },
  });
}
