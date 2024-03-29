import axios from "../../axios";
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
  FETCH_ONE_REQUEST,
  FETCH_ONE_SUCCESS,
  FETCH_ONE_FAILURE,
  CLEAR_FIND_ONE
} from "./user.types";

const fetch = ({ field, value }) => {
  return function (dispatch) {
    dispatch({ type: FETCH_REQUEST });
    axios()
      .get(`/user?field=${field}&value=${value}`)
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
  };
};

const fetchOne = ({ field, value }) => {
  return function (dispatch) {
    dispatch({ type: FETCH_ONE_REQUEST });
    axios()
      .get(`/user/find?field=${field}&value=${value}`)
      .then((response) => {
        dispatch({ type: FETCH_ONE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ONE_FAILURE, payload: error.response });
      });
  };
};

const create = (payload) => {
  return function (dispatch) {
    dispatch({ type: CREATE_REQUEST });
    axios()
      .post(`/user`, payload)
      .then((response) => {
        dispatch({ type: CREATE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: CREATE_FAILURE, payload: error.response.data });
        } else {
          dispatch({ type: CREATE_FAILURE, payload: error.message });
        }
      });
  };
};

const remove = (payload) => {
  return function (dispatch) {
    dispatch({ type: DELETE_REQUEST });
    axios()
      .delete(`/user/${payload}`)
      .then((response) => {
        dispatch({ type: DELETE_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: DELETE_FAILURE, payload: error.response });
      });
  };
};

const update = (payload) => {
  return function (dispatch) {
    dispatch({ type: UPDATE_REQUEST });
    axios()
      .put(`/user`, payload)
      .then((response) => {
        dispatch({ type: UPDATE_SUCCESS });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: UPDATE_FAILURE, payload: error.response.data });
        } else {
          dispatch({ type: UPDATE_FAILURE, payload: error.message });
        }
      });
  };
};

const clearFindOne = () => {
  return {
    type: CLEAR_FIND_ONE
  }
}

export default {
  fetch,
  create,
  update,
  remove,
  fetchOne,
  clearFindOne
};
