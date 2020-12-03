import { useDispatch } from "react-redux";
import axios from "../../axios";
import { getError } from "../../utils/ErrorResponse";
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_SUCCESS,
  CREATE_REQUEST,
  CREATE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  CLEAR_STORE,
  CREATE_ALL_REQUEST,
  CREATE_ALL_SUCCESS,
  CREATE_ALL_FAILURE
} from "./payment.types";

const endpoint = "/payment";

const fetch = async payload => {

  const { month, year, type, pageNumber, pageSize } = payload;
    var queryString = "";
    queryString += `${pageNumber ? `pageNumber=${pageNumber}&` : ""}`;
    queryString += `${pageSize ? `pageSize=${pageSize}&` : ""}`;
    queryString += `${year ? `year=${year}&` : ""}`;
    queryString += `${month ? `month=${month}&` : ""}`;

    const paymentType = type || "paid";

    try{
      const {data} = await axios().get(`${endpoint}/${paymentType}?${queryString}`)
      return data
    }catch(e){
      return false;
    }
};

const createAll = payload => {
  return axios().post(`${endpoint}/all`, payload,{
    params: payload
  })
};

const update = async payload => {
  try{
    const {data} = await axios().put(endpoint, payload)
    return data;
  }catch(e){
    return false
  }
};

const createAllNonPaying = (payload, page) => {
  return async function(dispatch) {
    dispatch({ type: CREATE_ALL_REQUEST });
    axios()
      .post("/payment_non_paying", {}, { params: payload })
      .then(response => {
        dispatch({ type: CREATE_ALL_SUCCESS });
        dispatch(fetch(page));
      })
      .catch(error => {
        dispatch({ type: CREATE_ALL_FAILURE });
      });
  };
};

const clear = payload => {
  return function(dispatch) {
    dispatch({ type: CLEAR_STORE });
  };
};

export default {
  fetch,
  clear,
  update,
  createAll,
  createAllNonPaying
};
