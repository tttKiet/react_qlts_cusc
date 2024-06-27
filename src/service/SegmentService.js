import axios from "../axios/customize-axios";
import { API_DATA } from "../constants";

const createSegment = async (data) => {
    return axios.post(`${API_DATA}/segment`, data)
    // console.log("Data send from frontend", data)
}

const deleteSegment = async (data) => {
    return axios.delete(`${API_DATA}/segment`, {
        data: {
            MaPQArray: data
        }
    });

}

const divisionSegment = async (data) => {
    return axios.patch(`${API_DATA}/segment`, data);

}

const updateSegment = async (data) => {
    // console.log(data)
    return axios.patch(`${API_DATA}/segment/open-contact`, data);
}

const refundSegment = async (data) => {
    return axios.patch(`${API_DATA}/segment/refund-permision`, data);
}


export default {
    createSegment,
    deleteSegment,
    divisionSegment,
    updateSegment,
    refundSegment
};



