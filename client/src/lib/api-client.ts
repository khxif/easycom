import axios from "axios";

export const apiClient = axios.create();
apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
