import axios from "../../axios";

import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from "./session.types";
import requests from "../async/async.actions";

export const createSessionAction = payload => {
  return function(dispatch) {
    dispatch(requests.send(FETCH_SESSION_REQUEST));
    axios()
      .post(`/sessions`, payload)
      .then(respose => {
        localStorage.setItem("user-token", respose.data.token);
        dispatch(requests.success(FETCH_SESSION_SUCCESS, respose.data.admin));
      })
      .catch(error => {
        dispatch(requests.failure(FETCH_SESSION_FAILURE, error.message));
      });
  };
};
