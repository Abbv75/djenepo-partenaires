import api from '../constant/AxiosInstance';
import type { Service } from '../types';

export async function fetchServices(): Promise<Service[]> {
  const res = await api.get('/services');
  return res.data.data;
}

export async function createService(data: Partial<Service>): Promise<Service> {
  const res = await api.post('/services', data);
  return res.data.data;
}

export async function updateService(id: number, data: Partial<Service>): Promise<Service> {
  const res = await api.put(`/services/${id}`, data);
  return res.data.data;
}

export async function deleteService(id: number): Promise<void> {
  await api.delete(`/services/${id}`);
}
