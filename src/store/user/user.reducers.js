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
  FETCH_ONE_REQUEST,
  FETCH_ONE_SUCCESS,
  FETCH_ONE_FAILURE,
  CLEAR_FIND_ONE
} from "./user.types";

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: "",
  findOne: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
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
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.payload],
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
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [],
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
        loading: false,
        error: "",
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ONE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        findOne: action.payload,
      };
    case FETCH_ONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_FIND_ONE:
      return {
        ...state,
        findOne: null,
      };
    default:
      return state;
  }
}

export default reducer;
