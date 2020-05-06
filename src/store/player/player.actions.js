import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
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
  UPDATE_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CLEAR_STORE,
} from "./player.types";

const endpoint = "/player";

const fetch = ({ pageNumber, pageSize, field, value }) => {
  return function(dispatch) {
    const queryString = `${pageNumber ? `pageNumber=${pageNumber}&` : ""}${
      pageSize ? `pageSize=${pageSize}&` : ""
    }${field ? `field=${field}&` : ""}${value ? `value=${value}&` : ""}`;

    dispatch({ type: FETCH_REQUEST });
    axios()
      .get(`${endpoint}?${queryString}`)
      .then((response) => {
        if (response.data.data) {
          response.data.data.map((item) => {
            if (item.ClubPlayers.length) {
              item.ClubPlayers = item.ClubPlayers[0];
            }
          });
        }

        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_FAILURE, payload: getError(error) });
      });
  };
};

const create = (payload) => {
  return async function(dispatch) {
    dispatch({ type: CREATE_REQUEST });
    axios()
      .post(endpoint, payload)
      .then((response) => {
        dispatch({ type: CREATE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: CREATE_FAILURE, payload: getError(error) });
      });
  };
};

const update = (payload) => {
  return async function(dispatch) {
    dispatch({ type: UPDATE_REQUEST });
    axios()
      .put(endpoint, payload)
      .then((response) => {
        dispatch({ type: UPDATE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_FAILURE, payload: getError(error) });
      });
  };
};

const remove = (payload) => {
  return function(dispatch) {
    dispatch({ type: DELETE_REQUEST });
    axios()
      .delete(`${endpoint}/${payload}`)
      .then(() => {
        dispatch({ type: DELETE_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: DELETE_FAILURE, payload: getError(error) });
      });
  };
};

const clear = (payload) => {
  return function(dispatch) {
    dispatch({ type: CLEAR_STORE });
  };
};

const resetPassword = (payload) => {
  return async function(dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    axios()
      .put(`${endpoint}/${payload}/reset_password`, payload)
      .then((response) => {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: getError(error) });
      });
  };
};

export default {
  fetch,
  clear,
  create,
  remove,
  update,
  resetPassword,
};
