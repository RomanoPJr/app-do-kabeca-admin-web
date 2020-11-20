import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  FETCH_ORGANIZER_TOKEN_REQUEST,
  FETCH_ORGANIZER_TOKEN_SUCCESS,
  FETCH_ORGANIZER_TOKEN_FAILURE
} from "./session.types";

const endpoint = "/sessions";

const fetch = () => {
  return function (dispatch) {
    dispatch({ type: FETCH_REQUEST });
    axios()
      .get(endpoint)
      .then((response) => {
        // dispatch({ type: FETCH_SUCCESS, payload: { ...response.data, type: 'PLAYER' } });
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_FAILURE, payload: getError(error) });
      });
  };
};

const fetchOrganizer = (payload) => {
  return function (dispatch) {
    dispatch({ type: FETCH_ORGANIZER_TOKEN_REQUEST });
    axios()
      .post(`${endpoint}/external`, payload)
      .then((response) => {
        localStorage.setItem('user-token', response.data.token);
        localStorage.setItem('is-redirect', true);
        dispatch({ type: FETCH_ORGANIZER_TOKEN_SUCCESS, payload: response.data.token });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ORGANIZER_TOKEN_FAILURE, payload: getError(error) });
      });
  };
};

const create = (payload) => {
  return function (dispatch) {
    dispatch({ type: CREATE_REQUEST });
    axios()
      .post(endpoint, payload)
      .then(({ data }) => {
        if (data) {
          localStorage.setItem("user-token", data.token);
        }
        dispatch({ type: CREATE_SUCCESS, payload: data.user });
      })
      .catch((error) => {
        dispatch({ type: CREATE_FAILURE, payload: getError(error) });
      });
  };
};

export default {
  fetch,
  fetchOrganizer,
  create,
};
