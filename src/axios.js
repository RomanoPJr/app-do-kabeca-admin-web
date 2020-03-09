import axios from "axios";

const axiosInstance = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user-token")}`
    }
  });

export default axiosInstance;
