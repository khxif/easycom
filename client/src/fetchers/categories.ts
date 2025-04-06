import { apiClient } from '@/lib/api-client';
import { CategorySchemaType } from '@/zod-schemas/category';

export const getCategories = async () => {
  const { data } = await apiClient.get('/categories');

  return data;
};

export const createCategories = async (department: CategorySchemaType) => {
  const data = await apiClient.post('/categories', department);

  return data;
};

export const getCategoriesById = async (id: string) => {
  const { data } = await apiClient.get(`/categories/${id}`);

  return data;
};

export const updateCategories = async (options: { id: string; department: CategorySchemaType }) => {
  const data = await apiClient.put(`/categories/${options?.id}`, options?.department);

  return data;
};

export const deleteCategories = async (id: string) => {
  const data = await apiClient.delete(`/categories/${id}`);

  return data;
};
