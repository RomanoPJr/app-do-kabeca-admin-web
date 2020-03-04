import {
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_FAILURE
} from "./token.types";

const INITIAL_STATE = {
  loading: false,
  data: "",
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TOKEN_SUCCESS:
      localStorage.setItem("@atento-test/user-token", action.payload.token);
      return {
        loading: false,
        data: "@atento-test/user-token",
        error: ""
      };
    case FETCH_TOKEN_FAILURE:
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
