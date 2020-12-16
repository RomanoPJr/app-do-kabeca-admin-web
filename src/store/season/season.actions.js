import axios from "../../axios";
import types from "./season.types";
import { getError } from "../../utils/ErrorResponse";

const endpoint = "/season";

const fetch = payload => {
  return function(dispatch) {
    dispatch({ type: types.FETCH_REQUEST });
    axios()
      .get(`${endpoint}?pageNumber=${payload.pageNumber}`)
      .then(response => {
        const data = response.data;
        dispatch({ type: types.FETCH_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_FAILURE, payload: getError(error) });
      });
  };
};

const create = payload => {
  return function(dispatch) {
    dispatch({ type: types.CREATE_REQUEST });
    axios()
      .post(endpoint, payload)
      .then(response => {
        dispatch({ type: types.CREATE_SUCCESS, payload: response.data });
        dispatch(fetch({ pageNumber: payload.pageNumber }));
      })
      .catch(error => {
        console.log(getError(error))
        dispatch({ type: types.CREATE_FAILURE, payload: getError(error) });
      });
  };
};


const remove = payload => {
  return function(dispatch) {
    dispatch({ type: types.DELETE_REQUEST });
    axios()
      .delete(`${endpoint}/${payload}`)
      .then(() => {
        dispatch({ type: types.DELETE_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: types.DELETE_FAILURE, payload: getError(error) });
      });
  };
};

export default {
  fetch,
  create,
  remove,
};
