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
import {
  request,
  requestSuccess,
  requestFailure
} from "../async/async.actions";

export const fetchAdminsAction = ({ pageNumber, pageSize }) => {
  return function(dispatch) {
    dispatch(request(FETCH_ADMIN_REQUEST));
    axios()
      .get(`/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then(respose => {
        dispatch(requestSuccess(FETCH_ADMIN_SUCCESS, respose.data));
      })
      .catch(error => {
        dispatch(requestFailure(FETCH_ADMIN_FAILURE, error.message));
      });
  };
};

export const createAdminAction = payload => {
  return function(dispatch) {
    dispatch(request(CREATE_ADMIN_REQUEST));
    axios()
      .post(`/admins`, payload)
      .then(respose => {
        dispatch(requestSuccess(CREATE_ADMIN_SUCCESS, respose.data));
      })
      .catch(error => {
        dispatch(requestFailure(CREATE_ADMIN_FAILURE, error.message));
      });
  };
};

export const deleteAdminAction = payload => {
  return function(dispatch) {
    dispatch(request(DELETE_ADMIN_REQUEST));
    axios()
      .delete(`/admins/${payload}`)
      .then(respose => {
        dispatch(requestSuccess(DELETE_ADMIN_SUCCESS));
      })
      .catch(error => {
        dispatch(requestFailure(DELETE_ADMIN_FAILURE, error.message));
      });
  };
};

export const updateAdminAction = payload => {
  return function(dispatch) {
    dispatch(request(UPDATE_ADMIN_REQUEST));
    axios()
      .put(`/admins/${payload.id}`, payload)
      .then(respose => {
        dispatch(requestSuccess(UPDATE_ADMIN_SUCCESS));
      })
      .catch(error => {
        dispatch(requestFailure(UPDATE_ADMIN_FAILURE, error.message));
      });
  };
};
