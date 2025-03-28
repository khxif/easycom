import axios from 'axios';
import { tokenStorage } from './token-storage';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

apiClient.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if (token) config.headers.authorization = token;

  return config;
});
