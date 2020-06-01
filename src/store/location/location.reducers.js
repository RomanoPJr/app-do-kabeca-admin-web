import {
  FETCH_UFS_REQUEST,
  FETCH_UFS_SUCCESS,
  FETCH_UFS_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE
} from "./location.types";

const INITIAL_STATE = {
  loading: false,
  data: {
    ufs: [],
    cities: []
  },
  error: "",
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_UFS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UFS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, ufs: action.payload },
        error: "",
      };
    case FETCH_UFS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, cities: action.payload },
        error: "",
      };
    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
