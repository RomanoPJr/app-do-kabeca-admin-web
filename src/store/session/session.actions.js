import axios from "../../axios";

import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from "./session.types";
import {
  request,
  requestSuccess,
  requestFailure
} from "../async/async.actions";

export const createSessionAction = payload => {
  return function(dispatch) {
    dispatch(request(FETCH_SESSION_REQUEST));
    axios
      .post(`/sessions`, payload)
      .then(respose => {
        localStorage.setItem("user-token", respose.data.token);
        dispatch(requestSuccess(FETCH_SESSION_SUCCESS, respose.data.admin));
      })
      .catch(error => {
        dispatch(requestFailure(FETCH_SESSION_FAILURE, error.message));
      });
  };
};
