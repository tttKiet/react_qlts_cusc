import axios from "../axios/customize-axios";
import { API_FILE } from "../constants";

const readAll = async (data) => {
  return axios.get(`${API_FILE}/readAll?${data}`);
};

const readAll_UM = async (data) => {
  return axios.get(`${API_FILE}/readAll-UM?${data}`);
};

const deleted = async (data) => {
  return axios.delete(`${API_FILE}/${data}`);
};

export default {
  readAll,
  deleted,
  readAll_UM,
};
