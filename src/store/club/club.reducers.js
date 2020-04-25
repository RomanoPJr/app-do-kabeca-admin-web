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
} from "./club.types";

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: "",
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: null,
        error: "",
      };
    case DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default reducer;
