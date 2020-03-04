import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from "./session.types";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SESSION_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: ""
      };
    case FETCH_SESSION_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
