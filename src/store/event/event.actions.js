import store from "../index";
import axios from "../../axios";
import types from "./event.types";
import { getError } from "../../utils/ErrorResponse";

const endpoint = "/event";

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

const fetch2 = async () => {
  const { data } = await axios().get(`${endpoint}?pageNumber=1`);
  return data;
};

const fetchAll = async payload => {
  store.dispatch({ type: types.FETCH_ALL_REQUEST });
  await axios()
    .get(`${endpoint}/all`)
    .then(async response => {
      const data = response.data.data;
      await store.dispatch({ type: types.FETCH_ALL_SUCCESS, payload: data });
    })
    .catch(error => {
      store.dispatch({
        type: types.FETCH_ALL_FAILURE,
        payload: getError(error)
      });
    });
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
        dispatch({ type: types.CREATE_FAILURE, payload: getError(error) });
      });
  };
};

const update = payload => {
  return function(dispatch) {
    dispatch({ type: types.UPDATE_REQUEST });
    axios()
      .put(endpoint, payload)
      .then(response => {
        dispatch({ type: types.UPDATE_SUCCESS, payload: response.data });
        dispatch(fetch({ pageNumber: payload.pageNumber }));
      })
      .catch(error => {
        dispatch({ type: types.UPDATE_FAILURE, payload: getError(error) });
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

const clear = () => {
  return function(dispatch) {
    dispatch({ type: types.CLEAR_STORE });
  };
};

export default {
  fetch2,
  fetch,
  clear,
  create,
  remove,
  update,
  fetchAll
};
