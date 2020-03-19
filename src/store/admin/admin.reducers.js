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
  UPDATE_FAILURE
} from "./admin.types";

const INITIAL_STATE = {
  loading: false,
  list: [],
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
        list: action.payload,
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
        list: [action.payload],
        error: ""
      };
    case CREATE_FAILURE:
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
        list: [],
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
    default:
      return state;
  }
}

export default reducer;
