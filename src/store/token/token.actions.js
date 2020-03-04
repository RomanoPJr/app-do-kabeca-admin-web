import axios from "axios";
import {
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILURE
} from "./token.types";
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure
} from "../async/async.actions";
import { API_URL } from "../../constants";
import { fetchColaboradorAction } from "../colaborador/colaborador.actions";

export const fetchTokenAction = payload => {
  return function(dispatch) {
    dispatch(fetchRequest(FETCH_TOKEN_REQUEST));
    axios
      .post(`${API_URL}/sessions`, payload)
      .then(respose => {
        dispatch(fetchSuccess(FETCH_TOKEN_SUCCESS, respose.data));
        dispatch(fetchColaboradorAction(respose.data.cpfColaborador));
      })
      .catch(error => {
        dispatch(fetchFailure(FETCH_TOKEN_FAILURE, error.message));
      });
  };
};
