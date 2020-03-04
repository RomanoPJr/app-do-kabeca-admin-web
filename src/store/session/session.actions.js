import axios from "axios";

import { API_URL } from "../../constants";
import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from "./session.types";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure
} from "../async/async.actions";

export const createSessionAction = payload => {
  return function(dispatch) {
    dispatch(fetchRequest(FETCH_SESSION_REQUEST));
    axios
      .post(`${API_URL}/sessions`, payload)
      .then(respose => {
        localStorage.setItem("user-token", respose.data.token);
        dispatch(fetchSuccess(FETCH_SESSION_SUCCESS, respose.data.admin));
      })
      .catch(error => {
        dispatch(fetchFailure(FETCH_SESSION_FAILURE, error.message));
      });
  };
};
