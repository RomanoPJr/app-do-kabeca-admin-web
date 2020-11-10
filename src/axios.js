import axios from "axios";
import history from "./history";

const axiosInstance = () =>
  axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.REACT_APP_API_URL_PROD,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user-token")}`
    },
    validateStatus: status => {
      if (status && status === 401) {
        localStorage.removeItem("user-token");
        history.replace("/login");
      }
      return status >= 200 && status < 300;
    }
  });

export default axiosInstance;
