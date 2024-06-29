import axios from "../axios/customize-axios";
import { API_CHART } from "../constants";

const createThematic = async (data) => {
  return axios.post(`${API_THEMATIC}/create`, data);
};
