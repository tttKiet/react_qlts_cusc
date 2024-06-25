import axios from "../axios/customize-axios";
import { API_CUSTOMER } from "../constants";

const updateCustomer = async (data) => {
    // console.log("updateCustomer", data)
    return axios.post(`${API_CUSTOMER}/info`, data)
}

export default {
    updateCustomer,
};



