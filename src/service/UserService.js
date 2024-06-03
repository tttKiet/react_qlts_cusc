import axios from "../axios/customize-axios";
import { API_USER } from "../constants";
import { API_DATA } from "../constants";

const createUser = async (data) => {
    return axios.post(`${API_USER}`, data)
}

const updateUser = async (data) => {
    return axios.patch(`${API_USER}`, data)
}


export default {
    createUser,
    updateUser
};



