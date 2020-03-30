import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from "./session.types";

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        loading: true,
        data: null,
        error: ""
      };
    case FETCH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: ""
      };
    case FETCH_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    case CREATE_REQUEST:
      return {
        loading: true,
        data: null,
        error: ""
      };
    case CREATE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: ""
      };
    case CREATE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
