import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE
} from "./admin.types";

const INITIAL_STATE = {
  listAll: [],
  loading: false,
  error: "",
  createAdminLoading: false,
  createAdminError: ""
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
        ...state,
        loading: false,
        listAll: action.payload,
        error: ""
      };
    case FETCH_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        createAdminLoading: true
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        createAdminLoading: false,
        createAdminError: ""
      };
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        createAdminLoading: false,
        createAdminError: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
