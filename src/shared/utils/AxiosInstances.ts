import axios from 'axios';

export const api2cartAxios = axios.create({
  baseURL: '',
});

api2cartAxios.interceptors.request.use((req) => req);

api2cartAxios.interceptors.response.use((res) => res);
