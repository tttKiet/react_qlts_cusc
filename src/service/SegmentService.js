import axios from "../axios/customize-axios";
import { API_DATA } from "../constants";

const createSegment = async (data) => {
    return axios.post(`${API_DATA}/segment`, data)
    // console.log("Data send from frontend", data)
}


export default {
    createSegment,
};



