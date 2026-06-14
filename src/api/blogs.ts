import api from '../constant/AxiosInstance';
import type { BlogPost } from '../types';

// --- API functions ---

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await api.get('/blogs');
  return res.data.data;
}

export async function fetchBlog(id: number): Promise<BlogPost> {
  const res = await api.get(`/blogs/${id}`);
  return res.data.data;
}

export async function fetchBlogsByCategory(categoryId: number): Promise<BlogPost[]> {
  const res = await api.get(`/categories/${categoryId}/blogs`);
  return res.data.data;
}

export async function createBlog(data: Partial<BlogPost>): Promise<BlogPost> {
  const res = await api.post('/blogs', data);
  return res.data.data;
}

export async function updateBlog(id: number, data: Partial<BlogPost>): Promise<BlogPost> {
  const res = await api.put(`/blogs/${id}`, data);
  return res.data.data;
}

export async function deleteBlog(id: number): Promise<void> {
  await api.delete(`/blogs/${id}`);
}
