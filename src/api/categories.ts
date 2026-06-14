import api from '../constant/AxiosInstance';
import type { Category } from '../types';

// --- API functions ---

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get('/categories');
  return res.data.data;
}

export async function fetchCategory(id: number): Promise<Category> {
  const res = await api.get(`/categories/${id}`);
  return res.data.data;
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  const res = await api.post('/categories', data);
  return res.data.data;
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
  const res = await api.put(`/categories/${id}`, data);
  return res.data.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/categories/${id}`);
}
