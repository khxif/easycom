import axios from 'axios';
import { tokenStorage } from './token-storage';

export const apiClient = axios.create();
apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
apiClient.defaults.headers.Authorization = tokenStorage.get();
