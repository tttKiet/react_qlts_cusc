import axios from "../axios/customize-axios";
import { API_DATA, API_FILE } from "../constants";

const createSegment = async (data) => {
  return axios.post(`${API_DATA}/segment`, data);
};

const deleteSegment = async (data) => {
  return axios.delete(`${API_DATA}/segment`, {
    data: {
      MaPQArray: data,
    },
  });
};

const divisionSegment = async (data) => {
  return axios.patch(`${API_DATA}/segment`, data);
};

const updateSegment = async (data) => {
  // console.log(data)
  return axios.patch(`${API_DATA}/segment/open-contact`, data);
};

const refundSegment = async (data) => {
  return axios.patch(`${API_DATA}/segment/refund-permision`, data);
};

const addFileExcelDataCustomerNew = (formData, config) => {
  return axios.post(`${API_FILE}/upload/dataCustomerNew`, formData, config);
};

const addFileExcelDataCustomerOld = (formData, config) => {
  return axios.post(`${API_FILE}/upload/dataCustomerOld`, formData, config);
};

const dataFileCustomer = (formData, config) => {
  return axios.post(`${API_FILE}/upload/dataFileCustomer`, formData, config);
};

const downLoadFile = (data) => {
  return axios.post(`${API_FILE}/downLoadFile`, data, {
    responseType: "blob", // Chỉ định loại dữ liệu trả về là blob
  });
};

export default {
  createSegment,
  deleteSegment,
  divisionSegment,
  updateSegment,
  refundSegment,
  addFileExcelDataCustomerNew,
  addFileExcelDataCustomerOld,
  downLoadFile,
  dataFileCustomer,
};
