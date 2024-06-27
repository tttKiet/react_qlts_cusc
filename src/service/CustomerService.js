import axios from "../axios/customize-axios";
import { API_CUSTOMER } from "../constants";

const updateCustomer = async (data) => {
    // console.log("updateCustomer", data)
    return axios.post(`${API_CUSTOMER}/info`, data)
}
const updateObject = async (data) => {
    // console.log("updateCustomer", data)
    return axios.post(`${API_CUSTOMER}/info-object`, data)
}
const updateRegister = async (data) => {
    console.log("updateRegister", data)
    return axios.post(`${API_CUSTOMER}/edit-registration`, data)
}

export default {
    updateCustomer,
    updateObject,
    updateRegister
};



