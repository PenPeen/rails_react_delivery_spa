import axios, { AxiosRequestConfig } from 'axios';

class ApiClient {
  get(path: string, data?: AxiosRequestConfig) {
    return axios.get(path, data).then((res) => res);
  }

  post<T>(path: string, data: T) {
    return axios.post(path, data).then((res) => res);
  }

  put<T>(path: string, data: T) {
    return axios.put(path, data).then((res) => res);
  }

  delete(path: string, data?: AxiosRequestConfig) {
    return axios.delete(path, data).then((res) => res);
  }
}

export default ApiClient;
