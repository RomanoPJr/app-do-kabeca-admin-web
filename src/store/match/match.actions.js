import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
import { upload } from "../../utils/Upload";
import typesMatch from "./match.types";
import store from "../index";
import { toast } from "react-toastify";
import history from "../../history";
const endpoint = "/match";

const fetchList = payload => {
  return function(dispatch) {
    dispatch({ type: typesMatch.FETCH_LIST_REQUEST });
    axios()
      .get(`${endpoint}?pageNumber=${payload.pageNumber}`)
      .then(response => {
        dispatch({
          type: typesMatch.FETCH_LIST_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: typesMatch.FETCH_LIST_FAILURE,
          payload: getError(error)
        });
      });
  };
};

const fetchOne = async id => {
  store.dispatch({ type: typesMatch.FETCH_ONE_REQUEST });
  await axios()
    .get(`${endpoint}/${id}`)
    .then(response => {
      store.dispatch({
        type: typesMatch.FETCH_ONE_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(error => {
      store.dispatch({
        type: typesMatch.FETCH_ONE_FAILURE,
        payload: getError(error)
      });
    });
};

const create = async payload => {
  store.dispatch({ type: typesMatch.CREATE_REQUEST });

  await axios()
    .post(endpoint, payload)
    .then(response => {
      store.dispatch({
        type: typesMatch.CREATE_SUCCESS,
        payload: response.data.data
      });
      history.push(`/organizer/matches/${response.data.data.id}`);
      toast.success(response.data.message);
    })
    .catch(error => {
      store.dispatch({
        type: typesMatch.CREATE_FAILURE,
        payload: getError(error)
      });
      toast.error(error.data.message);
    });
};

const update = payload => {
  return async function(dispatch) {
    dispatch({ type: typesMatch.UPDATE_REQUEST });
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
      .then(response => {
        dispatch({ type: typesMatch.UPDATE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: typesMatch.UPDATE_FAILURE, payload: getError(error) });
      });
  };
};

const remove = payload => {
  store.dispatch({ type: typesMatch.DELETE_REQUEST });
  axios()
    .delete(`${endpoint}/${payload}`)
    .then(() => {
      store.dispatch({ type: typesMatch.DELETE_SUCCESS });
    })
    .catch(error => {
      store.dispatch({
        type: typesMatch.DELETE_FAILURE,
        payload: getError(error)
      });
    });
};

const clear = payload => {
  return function(dispatch) {
    dispatch({ type: typesMatch.CLEAR_STORE });
  };
};

export default {
  clear,
  create,
  remove,
  update,
  fetchOne,
  fetchList
};
