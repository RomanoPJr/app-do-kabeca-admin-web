import axios from "axios";

const token = localStorage.getItem("user-token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default axiosInstance;
