import { toast } from "react-toastify";

import store from "../index";
import axios from "../../axios";
import typesMatch from "./match_event.types";
import { getError } from "../../utils/ErrorResponse";

const endpoint = "/match_event";

const create = async payload => {
  store.dispatch({ type: typesMatch.CREATE_REQUEST });

  await axios()
    .post(endpoint, payload)
    .then(response => {
      store.dispatch({
        type: typesMatch.CREATE_SUCCESS,
        payload: response.data
      });
      toast.success(response.data.message);
    })
    .catch(error => {
      toast.error(error.response.data.message);
      store.dispatch({
        type: typesMatch.CREATE_FAILURE,
        payload: getError(error)
      });
    });
};

const update = async payload => {
  store.dispatch({ type: typesMatch.UPDATE_REQUEST });

  await axios()
    .put(endpoint, payload)
    .then(response => {
      store.dispatch({
        type: typesMatch.UPDATE_SUCCESS,
        payload: response.data
      });
      toast.success(response.data.message);
    })
    .catch(error => {
      store.dispatch({
        type: typesMatch.UPDATE_FAILURE,
        payload: getError(error)
      });
      toast.success(error.data.message);
    });
};

const remove = async id => {
  store.dispatch({ type: typesMatch.DELETE_REQUEST });
  await axios()
    .delete(`${endpoint}/${id}`)
    .then(response => {
      store.dispatch({ type: typesMatch.DELETE_SUCCESS });
      toast.success(response.data.message);
    })
    .catch(error => {
      store.dispatch({
        type: typesMatch.DELETE_FAILURE,
        payload: getError(error)
      });
      toast.success(error.data.message);
    });
};

const clear = payload => {
  return function(dispatch) {
    dispatch({ type: typesMatch.CLEAR_STORE });
  };
};

export default {
  create,
  remove,
  update,
  clear
};
