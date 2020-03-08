import axios from "axios";

import { API_URL } from "../../constants";
import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE
} from "./admin.types";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure
} from "../async/async.actions";

export const adminListAllAction = ({ pageNumber, pageSize }) => {
  return function(dispatch) {
    const token = localStorage.getItem("user-token");
    dispatch(fetchRequest(FETCH_ADMIN_REQUEST));
    axios
      .get(`${API_URL}/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(respose => {
        dispatch(fetchSuccess(FETCH_ADMIN_SUCCESS, respose.data));
      })
      .catch(error => {
        dispatch(fetchFailure(FETCH_ADMIN_FAILURE, error.message));
      });
  };
};

export const createAdminAction = payload => {
  return function(dispatch) {
    const token = localStorage.getItem("user-token");
    dispatch(fetchRequest(CREATE_ADMIN_REQUEST));
    axios
      .post(`${API_URL}/admins`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(respose => {
        dispatch(fetchSuccess(CREATE_ADMIN_SUCCESS, respose.data));
      })
      .catch(error => {
        dispatch(fetchFailure(CREATE_ADMIN_FAILURE, error.message));
      });
  };
};
