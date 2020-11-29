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
} from "./suggestion_statute.types";

const endpoint = "/admin/suggestion_statute";

const fetch = () => {
  return function(dispatch) {
    dispatch({ type: FETCH_REQUEST });
    axios()
      .get('/suggestion_statute')
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_FAILURE, payload: getError(error) });
      });
  };
};

const create = (payload) => {
  return function(dispatch) {
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
  return function(dispatch) {
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
      .then((response) => {
        dispatch({ type: DELETE_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: DELETE_FAILURE, payload: getError(error) });
      });
  };
};

export default {
  fetch,
  create,
  remove,
  update,
};
