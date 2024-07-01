import axios from "../axios/customize-axios";
import { API_THEMATIC } from "../constants";

const createThematic = async (data) => {
    return axios.post(`${API_THEMATIC}/create`, data)
}

const updateThematic = async (data) => {
    return axios.put(`${API_THEMATIC}/update`, data)
}

const deleteThematic = async (data) => {
    return axios.delete(`${API_THEMATIC}/delete`, { data })
}

export default {
    createThematic,
    updateThematic,
    deleteThematic
};



