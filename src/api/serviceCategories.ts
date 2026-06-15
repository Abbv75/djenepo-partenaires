import api from '../constant/AxiosInstance';
import type { ServiceCategory } from '../types';

export async function fetchServiceCategories(): Promise<ServiceCategory[]> {
  const res = await api.get('/service-categories');
  return res.data.data;
}

export async function fetchServiceCategory(id: number): Promise<ServiceCategory> {
  const res = await api.get(`/service-categories/${id}`);
  return res.data.data;
}

export async function createServiceCategory(data: Partial<ServiceCategory>): Promise<ServiceCategory> {
  const res = await api.post('/service-categories', data);
  return res.data.data;
}

export async function updateServiceCategory(id: number, data: Partial<ServiceCategory>): Promise<ServiceCategory> {
  const res = await api.put(`/service-categories/${id}`, data);
  return res.data.data;
}

export async function deleteServiceCategory(id: number): Promise<void> {
  await api.delete(`/service-categories/${id}`);
}
