import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../constant/AxiosInstance';
import { blogKeys } from '../constant/queryKeys';
import type { BlogPost } from '../types';

// --- Queries ---

export function useBlogs() {
  return useQuery({
    queryKey: blogKeys.list(),
    queryFn: async (): Promise<BlogPost[]> => {
      const res = await api.get('/blogs.php');
      return res.data.data;
    },
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: async (): Promise<BlogPost> => {
      const res = await api.get(`/blogs.php?id=${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
}

export function useBlogsByCategory(categoryId: number) {
  return useQuery({
    queryKey: blogKeys.byCategory(categoryId),
    queryFn: async (): Promise<BlogPost[]> => {
      const res = await api.get(`/categories.php?id=${categoryId}&action=blogs`);
      return res.data.data;
    },
    enabled: !!categoryId,
  });
}

// --- Mutations ---

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<BlogPost>): Promise<BlogPost> => {
      const res = await api.post('/blogs.php', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<BlogPost> }): Promise<BlogPost> => {
      const res = await api.put(`/blogs.php?id=${id}`, data);
      return res.data.data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/blogs.php?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
    },
  });
}
