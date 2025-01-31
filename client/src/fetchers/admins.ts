import { apiClient } from '@/lib/api-client';

export const getAdmins = async () => {
  const data = apiClient.get('/admins');

  return data;
};
