import axios from "../axios/customize-axios";
import { API_MISSCALL } from "../constants";

const create = (data) => {
  return axios.post(`${API_MISSCALL}/create`, data);
};

const readAllUM = (data) => {
  return axios.get(`${API_MISSCALL}/readAll?${data}`);
};

const update = (data) => {
  return axios.patch(`${API_MISSCALL}/update`, data);
};

const remove = (data) => {
  return axios.delete(`${API_MISSCALL}/${data}`);
};

export default {
  create,
  readAllUM,
  update,
  remove,
};
