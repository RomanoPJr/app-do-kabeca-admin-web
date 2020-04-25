import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
import { upload } from "../../utils/Upload";
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
  CLEAR_STORE,
} from "./payment.types";

const endpoint = "/payment";

const fetch = (payload) => {
  return function(dispatch) {
    dispatch({ type: FETCH_REQUEST });
    axios()
      .get(`${endpoint}?pageNumber=${payload.pageNumber}`)
      .then((response) => {
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

    if (payload.banner_url && payload.banner_url !== "") {
      const dataUpload = await upload(payload.banner_url);
      payload.banner_url = dataUpload.url;
    }

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
    if (
      payload.banner_url &&
      payload.banner_url !== "" &&
      payload.banner_url.search("res.cloudinary.com") === -1
    ) {
      const dataUpload = await upload(payload.banner_url);
      payload.banner_url = dataUpload.url;
    }

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

export default {
  fetch,
  create,
  remove,
  update,
  clear,
};
