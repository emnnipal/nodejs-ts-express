import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
});

axiosInstance.interceptors.request.use((req) => req);

axiosInstance.interceptors.response.use((res) => res);
