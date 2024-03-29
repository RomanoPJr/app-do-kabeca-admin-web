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
  CREATE_ALL_REQUEST,
  CREATE_ALL_SUCCESS,
  CREATE_ALL_FAILURE,
  CLEAR_STORE
} from "./payment.types";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_ALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case CREATE_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ""
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_STORE:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
}

export default reducer;
