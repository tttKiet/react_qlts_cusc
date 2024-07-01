import axios from "../axios/customize-axios";
import { API_FILE } from "../constants";

const readAll = async (data) => {
  return axios.get(`${API_FILE}/readAll`, data);
};

const deleted = async (data) => {
  return axios.delete(`${API_FILE}/${data}`);
};

export default {
  readAll,
  deleted,
};
