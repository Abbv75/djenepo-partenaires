import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogKeys } from './queryKeys';
import {
  fetchBlogs,
  fetchBlog,
  fetchBlogsByCategory,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blogs';

// --- Queries ---

export function useBlogs() {
  return useQuery({
    queryKey: blogKeys.list(),
    queryFn: fetchBlogs,
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => fetchBlog(id),
    enabled: !!id,
  });
}

export function useBlogsByCategory(categoryId: number) {
  return useQuery({
    queryKey: blogKeys.byCategory(categoryId),
    queryFn: () => fetchBlogsByCategory(categoryId),
    enabled: !!categoryId,
  });
}

// --- Mutations ---

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateBlog>[1] }) =>
      updateBlog(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.list() });
    },
  });
}
