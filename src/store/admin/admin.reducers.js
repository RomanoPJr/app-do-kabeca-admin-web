import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_SUCCESS,
  FETCH_ADMIN_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAILURE,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILURE
} from "./admin.types";

const INITIAL_STATE = {
  listAll: [],
  loading: false,
  error: "",
  createAdminError: "",
  deleteAdminError: "",
  updateAdminError: "",
  createAdminLoading: false,
  deleteAdminLoading: false,
  updateAdminLoading: false
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
    case DELETE_ADMIN_REQUEST:
      return {
        ...state,
        deleteAdminLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteAdminLoading: false,
        deleteAdminError: ""
      };
    case DELETE_ADMIN_FAILURE:
      return {
        ...state,
        deleteAdminLoading: false,
        deleteAdminError: action.payload
      };
    case UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        updateAdminLoading: true
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        updateAdminLoading: false,
        updateAdminError: ""
      };
    case UPDATE_ADMIN_FAILURE:
      return {
        ...state,
        updateAdminLoading: false,
        updateAdminError: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
