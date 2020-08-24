import typesMatch from "./match_event.types";

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case typesMatch.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case typesMatch.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case typesMatch.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case typesMatch.DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case typesMatch.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case typesMatch.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case typesMatch.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case typesMatch.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case typesMatch.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case typesMatch.CLEAR_STORE:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
}

export default reducer;
