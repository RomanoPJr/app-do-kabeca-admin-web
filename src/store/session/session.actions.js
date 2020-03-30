import axios from "../../axios";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from "./session.types";
import requests from "../async/async.actions";

const fetch = () => {
  return function(dispatch) {
    dispatch(requests.send(FETCH_REQUEST));
    axios()
      .get(`/sessions`)
      .then(response => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_FAILURE,
          payload: error.message
        });
      });
  };
};

const create = payload => {
  return function(dispatch) {
    dispatch(requests.send(CREATE_REQUEST));
    axios()
      .post(`/sessions`, payload)
      .then(response => {
        localStorage.setItem("user-token", response.data.token);

        dispatch({
          type: CREATE_SUCCESS,
          payload: response.data.admin
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_FAILURE,
          payload: error.message
        });
      });
  };
};

export default {
  fetch,
  create
};
