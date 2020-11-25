import axios from "axios";
import history from "./history";

const axiosInstance = () => { 
  
  const player_club_id = localStorage.getItem("@APPDOKABECA:club_id");
  let requestHeader = {}
  
  if(player_club_id){
    requestHeader = {
      club_id: player_club_id
    }
  }

  return axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.REACT_APP_API_URL_PROD,
    timeout: 10000,
    headers: {
      ...requestHeader,
      Authorization: `Bearer ${localStorage.getItem("@APPDOKABECA:user_token")}`,
    },
    validateStatus: status => {
      if (status && status === 401) {
        localStorage.removeItem("@APPDOKABECA:user_token");
        localStorage.removeItem("@APPDOKABECA:user_type");
        localStorage.removeItem("@APPDOKABECA:club_id");
        history.replace("/login");
      }
      return status >= 200 && status < 300;
    }
  });
}
export default axiosInstance;
