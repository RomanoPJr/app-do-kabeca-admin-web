import types from "./match_invite.types";

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };
    case types.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.payload],
        error: ""
      };
    case types.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [],
        error: ""
      };
    case types.DELETE_FAILURE:
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
