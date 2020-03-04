import axios from "axios";

import { API_URL } from "../../constants";
import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE
} from "./admin.types";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure
} from "../async/async.actions";

export const adminListAll = ({ pageNumber, pageSize }) => {
  return function(dispatch) {
    const token = "";
    dispatch(fetchRequest(FETCH_ADMIN_REQUEST));
    axios
      .get(`${API_URL}/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        header: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(respose => {
        console.log(respose);
        dispatch(fetchSuccess(FETCH_ADMIN_SUCCESS, respose));
      })
      .catch(error => {
        dispatch(fetchFailure(FETCH_ADMIN_FAILURE, error.message));
      });
  };
};
