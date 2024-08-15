import axios from "axios";

class ApiClient {
  get(path: string) {
    return axios.get(path).then((res) => res.data);
  }

  post<T>(path: string, data: T) {
    return axios.post(path, data).then((res) => res.data);
  }

  put<T>(path: string, data: T) {
    return axios.put(path, data).then((res) => res.data);
  }
}

export default ApiClient;
