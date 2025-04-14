import { apiClient } from '@/lib/api-client';
import { FilterQueryType } from '@/zod-schemas/query';
import qs from 'query-string';

export const getUsers = async (query: Partial<FilterQueryType>) => {
  const queryString = qs.stringify(query, { skipNull: true, skipEmptyString: true });

  const { data } = await apiClient.get(`/users?${queryString}`);
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await apiClient.get(`/users/${id}`);

  return data;
};

export const deleteUser = async (id: string) => {
  const data = await apiClient.delete(`/users/${id}`);

  return data;
};
