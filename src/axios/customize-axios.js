import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

// const handleRefetshToken = async () => {
//   const res = await instance.post("/api/v1/auth/refresh");
//   if (res) {
//     return res.data.DT;
//   } else {
//     return null;
//   }
// };

// instance.interceptors.request.use(
//   function (config) {
//     let accessToken = localStorage.getItem("accessToken");
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// const NO_RETRY_HEADER = "x-no-retry";

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.statusCode == 0 || response.data.statusCode == 200) {
      return response.data;
    } else {
      return Promise.reject({ msg: response.data.msg });
    }
  },
  function (error) {
    // console.log("error", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
  }
);

export default instance;
