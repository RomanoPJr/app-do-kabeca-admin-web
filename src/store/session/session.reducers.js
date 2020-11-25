import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  FETCH_ORGANIZER_TOKEN_REQUEST,
  FETCH_ORGANIZER_TOKEN_SUCCESS,
  FETCH_ORGANIZER_TOKEN_FAILURE
} from "./session.types";

const INITIAL_STATE = {
  loading: false,
  data: null,
  external: null,
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: ""
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
        data: null,
        error: action.payload
      };
    case FETCH_ORGANIZER_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        external: action.payload,
        error: ""
      };
    case FETCH_ORGANIZER_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        external: null,
        error: action.payload
      };
    case CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: ""
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
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
