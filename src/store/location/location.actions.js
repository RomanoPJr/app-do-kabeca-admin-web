import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
import {
  FETCH_UFS_REQUEST,
  FETCH_UFS_SUCCESS,
  FETCH_UFS_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE
} from "./location.types";


const fetchUFS = () => {
  return function (dispatch) {
    dispatch({ type: FETCH_UFS_REQUEST });
    axios()
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`)
      .then((response) => {
        dispatch({ type: FETCH_UFS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_UFS_FAILURE, payload: getError(error) });
      });
  };
};

const fetchCities = (payload) => {
  return function (dispatch) {
    dispatch({ type: FETCH_CITIES_REQUEST });
    axios()
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${payload}/municipios?orderBy=nome`)
      .then((response) => {
        dispatch({ type: FETCH_CITIES_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CITIES_FAILURE, payload: getError(error) });
      });
  };
};

export default {
  fetchUFS,
  fetchCities,
};
