import axios from "../../axios";

import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILURE,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILURE
} from "./admin.types";
import requests from "../async/async.actions";

export const fetchAdminsAction = ({ pageNumber, pageSize }) => {
  return function(dispatch) {
    dispatch(requests.send(FETCH_ADMIN_REQUEST));
    axios()
      .get(`/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then(response => {
        dispatch(requests.success(FETCH_ADMIN_SUCCESS, response.data));
      })
      .catch(error => {
        dispatch(requests.failure(FETCH_ADMIN_FAILURE, error.message));
      });
  };
};

export const createAdminAction = payload => {
  return function(dispatch) {
    dispatch(requests.send(CREATE_ADMIN_REQUEST));
    axios()
      .post(`/admins`, payload)
      .then(response => {
        dispatch(requests.success(CREATE_ADMIN_SUCCESS, response.data));
      })
      .catch(error => {
        dispatch(requests.failure(CREATE_ADMIN_FAILURE, error.message));
      });
  };
};

export const deleteAdminAction = payload => {
  return function(dispatch) {
    dispatch(requests.send(DELETE_ADMIN_REQUEST));
    axios()
      .delete(`/admins/${payload}`)
      .then(response => {
        dispatch(requests.success(DELETE_ADMIN_SUCCESS));
      })
      .catch(error => {
        dispatch(requests.failure(DELETE_ADMIN_FAILURE, error.message));
      });
  };
};

export const updateAdminAction = payload => {
  return function(dispatch) {
    dispatch(requests.send(UPDATE_ADMIN_REQUEST));
    axios()
      .put(`/admins`, payload)
      .then(response => {
        dispatch(requests.success(UPDATE_ADMIN_SUCCESS));
      })
      .catch(error => {
        dispatch(requests.failure(UPDATE_ADMIN_FAILURE, error.message));
      });
  };
};
