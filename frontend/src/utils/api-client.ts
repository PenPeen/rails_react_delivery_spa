import axios from "axios";

class ApiClient {
  get(path: string) {
    return axios
      .get(path)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.error(e));
  }
}

export default ApiClient;
