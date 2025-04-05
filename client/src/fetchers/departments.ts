import { apiClient } from '@/lib/api-client';
import { DepartmentSchemaType } from '@/zod-schemas/department';

export const getDepartments = async () => {
  const { data } = await apiClient.get('/departments');

  return data;
};

export const createDepartments = async (department: DepartmentSchemaType) => {
  const data = await apiClient.post('/departments', department);

  return data;
};

export const getDepartmentsById = async (id: string) => {
  const { data } = await apiClient.get(`/departments/${id}`);

  return data;
};

export const updateDepartments = async (options: {
  id: string;
  department: DepartmentSchemaType;
}) => {
  const data = await apiClient.put(`/departments/${options?.id}`, options?.department);

  return data;
};

export const deleteDepartments = async (id: string) => {
  const data = await apiClient.delete(`/departments/${id}`);

  return data;
};
