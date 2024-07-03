import axios from "../axios/customize-axios";
import { API_AUTH } from "../constants";

const login = (data) => {
  return axios.post(`${API_AUTH}/login`, data);
};

const logout = async () => {
  return await axios.post(`${API_AUTH}/logout`);
};

export default {
  login,
  logout,
};
