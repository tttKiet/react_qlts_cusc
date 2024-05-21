import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    let accessToken = localStorage.getItem("access_token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data.statusCode == 0 || response.data.statusCode == 200) {
      return response.data;
    } else {
      return Promise.reject({ message: response.data?.message });
    }
  },
  function (error) {
    return Promise.reject(error.response?.data);
  }
);

export default instance;
