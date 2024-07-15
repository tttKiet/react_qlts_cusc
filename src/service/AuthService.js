import axios from "../axios/customize-axios";
import { API_AUTH } from "../constants";

const login = (data) => {
  return axios.post(`${API_AUTH}/login`, data);
};

const logout = async () => {
  return await axios.get(`${API_AUTH}/logout`);
};

const timeLogin = async (data) => {
  return await axios.get(`${API_AUTH}/time-login?${data}`);
};

export default {
  login,
  logout,
  timeLogin,
};
