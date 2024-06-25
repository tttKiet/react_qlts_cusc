import axios from "../axios/customize-axios";
import { API_USER } from "../constants";
import { API_DATA } from "../constants";

const createUser = async (data) => {
    return axios.post(`${API_USER}`, data)
}

const updateUser = async (data) => {
    return axios.patch(`${API_USER}`, data)
}

const deleteUser = async (data) => {
    // console.log(data)
    return axios.delete(`${API_USER}/account`, { data })
}

export default {
    createUser,
    updateUser,
    deleteUser
};



