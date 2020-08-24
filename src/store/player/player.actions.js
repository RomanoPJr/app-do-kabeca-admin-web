import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
import types from "./player.types";
import store from "../index";
import { toast } from "react-toastify";

const endpoint = "/player";

const fetch = ({ pageNumber, pageSize, field, value }) => {
  return function(dispatch) {
    const queryString = `${pageNumber ? `pageNumber=${pageNumber}&` : ""}${
      pageSize ? `pageSize=${pageSize}&` : ""
    }${field ? `field=${field}&` : ""}${value ? `value=${value}&` : ""}`;

    dispatch({ type: types.FETCH_REQUEST });
    axios()
      .get(`${endpoint}?${queryString}`)
      .then(response => {
        if (response.data.data) {
          response.data.data.map(item => {
            if (item.ClubPlayers.length) {
              item.ClubPlayers = item.ClubPlayers[0];
            }
          });
        }

        dispatch({ type: types.FETCH_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_FAILURE, payload: getError(error) });
      });
  };
};

const fetchAll = payload => {
  store.dispatch({ type: types.FETCH_ALL_REQUEST });
  axios()
    .get(
      `${endpoint}/all?orderBy=name&match_id=${payload.match_id}&round=${payload.round}`
    )
    .then(response => {
      store.dispatch({
        type: types.FETCH_ALL_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(error => {
      toast.error(error.response.data.message);
      store.dispatch({
        type: types.FETCH_ALL_FAILURE,
        payload: getError(error)
      });
    });
};

const create = payload => {
  return async function(dispatch) {
    dispatch({ type: types.CREATE_REQUEST });
    axios()
      .post(endpoint, payload)
      .then(response => {
        dispatch({ type: types.CREATE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.CREATE_FAILURE, payload: getError(error) });
      });
  };
};

const update = payload => {
  return async function(dispatch) {
    dispatch({ type: types.UPDATE_REQUEST });
    axios()
      .put(endpoint, payload)
      .then(response => {
        dispatch({ type: types.UPDATE_SUCCESS, payload: response.data });
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

const clear = payload => {
  return function(dispatch) {
    dispatch({ type: types.CLEAR_STORE });
  };
};

const resetPassword = payload => {
  return async function(dispatch) {
    dispatch({ type: types.RESET_PASSWORD_REQUEST });
    axios()
      .put(`${endpoint}/${payload}/reset_password`, payload)
      .then(response => {
        dispatch({
          type: types.RESET_PASSWORD_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: types.RESET_PASSWORD_FAILURE,
          payload: getError(error)
        });
      });
  };
};

export default {
  fetch,
  clear,
  create,
  remove,
  update,
  fetchAll,
  resetPassword
};
