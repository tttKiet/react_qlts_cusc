import axios from "../axios/customize-axios";

const login = (data) => {
  return axios.post("/api/auth/login", data);
  // return axios.post("/api/v1/auth/login", data);
};

const logout = ({ email, password }) => {
  return axios.post("/api/v1/auth/logout");
};

export default {
  login,
  logout,
};



