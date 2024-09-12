import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

function applyCaseMiddleware(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use((config) => {
    return config;
  });

  return axiosInstance;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3001') {
    const instance = axios.create({ baseURL });
    this.axiosInstance = applyCaseMiddleware(instance);
  }

  get(path: string, data?: AxiosRequestConfig) {
    return this.axiosInstance.get(path, data).then((res) => res.data);
  }

  post<T>(path: string, data: T) {
    return this.axiosInstance.post(path, data).then((res) => res.data);
  }

  put<T>(path: string, data: T) {
    return this.axiosInstance.put(path, data).then((res) => res.data);
  }

  delete(path: string, data?: AxiosRequestConfig) {
    return this.axiosInstance.delete(path, data).then((res) => res.data);
  }
}

export default ApiClient;
