import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  CHANGE_USER_TYPE,
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
      .then(({ data }) => {
        let userData = { ...data };

        if (userData.clubs && userData.clubs.length > 0) {
          userData = { ...userData, current_club_id: userData.clubs[0].club_id }
        }

        dispatch({ type: FETCH_SUCCESS, payload: userData });
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
        localStorage.setItem('@APPDOKABECA:user_token', response.data.token);
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
        if (data && data.token) {
          localStorage.setItem("@APPDOKABECA:user_token", data.token);
          localStorage.setItem("@APPDOKABECA:user_type", data.user.type);
        }
        if (data && data.user && data.user.clubs && data.user.clubs.length > 0) {
          localStorage.setItem("@APPDOKABECA:club_id", data.user.clubs[0].club_id);
        }
        dispatch({ type: CREATE_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: CREATE_FAILURE, payload: getError(error) });
      });
  };
};

const setUserType = (payload) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_USER_TYPE, payload });
  };
};

export default {
  fetch,
  setUserType,
  fetchOrganizer,
  create,
};
