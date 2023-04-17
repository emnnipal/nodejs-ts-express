import axios, { AxiosInstance } from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
});

axiosInstance.interceptors.request.use((config) => config);

axiosInstance.interceptors.response.use((res) => res);

export class BaseSampleService {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axiosInstance;
  }
}
