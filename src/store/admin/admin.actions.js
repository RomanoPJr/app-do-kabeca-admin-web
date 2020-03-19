import axios from "../../axios";

import requests from "../async/async.actions";
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from "./admin.types";

const fetch = ({ pageNumber, pageSize }) => {
  return function(dispatch) {
    dispatch(requests.send(FETCH_REQUEST));
    axios()
      .get(`/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then(response => {
        dispatch(requests.success(FETCH_SUCCESS, response.data));
      })
      .catch(error => {
        dispatch(requests.failure(FETCH_FAILURE, error.message));
      });
  };
};

const create = payload => {
  return function(dispatch) {
    dispatch(requests.send(CREATE_REQUEST));
    axios()
      .post(`/admins`, payload)
      .then(response => {
        dispatch(requests.success(CREATE_SUCCESS, response.data));
      })
      .catch(error => {
        dispatch(requests.failure(CREATE_FAILURE, error.message));
      });
  };
};

const remove = payload => {
  return function(dispatch) {
    dispatch(requests.send(DELETE_REQUEST));
    axios()
      .delete(`/admins/${payload}`)
      .then(response => {
        dispatch(requests.success(DELETE_SUCCESS));
      })
      .catch(error => {
        dispatch(requests.failure(DELETE_FAILURE, error.message));
      });
  };
};

const update = payload => {
  return function(dispatch) {
    dispatch(requests.send(UPDATE_REQUEST));
    axios()
      .put(`/admins`, payload)
      .then(response => {
        dispatch(requests.success(UPDATE_SUCCESS));
      })
      .catch(error => {
        dispatch(requests.failure(UPDATE_FAILURE, error.message));
      });
  };
};

export default {
  fetch,
  create,
  update,
  remove
};
