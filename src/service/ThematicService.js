import axios from "../axios/customize-axios";
import { API_THEMATIC } from "../constants";

const createThematic = async (data) => {
    return axios.post(`${API_THEMATIC}/create`, data)
}

export default {
    createThematic
};



