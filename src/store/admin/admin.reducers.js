import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE
} from "./admin.types";

const INITIAL_STATE = {
  loading: false,
  listAll: [],
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ADMIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ADMIN_SUCCESS:
      return {
        loading: false,
        listAll: action.payload,
        error: ""
      };
    case FETCH_ADMIN_FAILURE:
      return {
        loading: false,
        listAll: {},
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
