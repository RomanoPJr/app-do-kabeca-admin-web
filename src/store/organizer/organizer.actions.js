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
} from "./organizer.types";

const fetch = () => {
  return function(dispatch) {
    dispatch(requests.send(FETCH_REQUEST));
    axios()
      .get(`/organizer`)
      .then(respose => {
        const payload = respose.data || [];
        dispatch(requests.success(FETCH_SUCCESS, payload));
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
      .post(`/organizer`, payload)
      .then(respose => {
        dispatch(requests.success(CREATE_SUCCESS, respose.data));
      })
      .catch(error => {
        dispatch(requests.failure(CREATE_FAILURE, error.message));
      });
  };
};

const update = payload => {
  return function(dispatch) {
    dispatch(requests.send(UPDATE_REQUEST));
    axios()
      .put(`/organizer`, payload)
      .then(response => {
        dispatch(requests.success(UPDATE_SUCCESS, response.data));
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          dispatch(
            requests.failure(UPDATE_FAILURE, error.response.data.message)
          );
        } else {
          dispatch(requests.failure(UPDATE_FAILURE, error.message));
        }
      });
  };
};

const remove = payload => {
  return function(dispatch) {
    dispatch(requests.send(DELETE_REQUEST));
    axios()
      .delete(`/organizer/${payload}`)
      .then(respose => {
        dispatch(requests.success(DELETE_SUCCESS));
      })
      .catch(error => {
        dispatch(requests.failure(DELETE_FAILURE, error.message));
      });
  };
};

export default {
  fetch,
  create,
  remove,
  update
};
