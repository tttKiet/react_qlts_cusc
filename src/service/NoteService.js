import axios from "../axios/customize-axios";
import { API_NOTE } from "../constants";

const createNote = async (data) => {
    return axios.post(`${API_NOTE}/create`, data)
}

// const updateUser = async (data) => {
//     return axios.patch(`${API_USER}`, data)
// }

const deleteUser = async (data) => {
    return axios.delete(`${API_NOTE}/${data}`)
}

export default {
    createNote,
    deleteUser
};



