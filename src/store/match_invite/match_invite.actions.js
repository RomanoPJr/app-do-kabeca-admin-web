import axios from "../../axios";
import types from "./match_invite.types";
import { getError } from "../../utils/ErrorResponse";
import { toast } from "react-toastify";

const endpoint = "/match-invite";

// const fetch = payload => {
//   return function (dispatch) {
//     dispatch({ type: types.FETCH_REQUEST });
//     axios()
//       .get(`${endpoint}?pageNumber=${payload ? payload.pageNumber : 1}`)
//       .then(response => {
//         const data = response.data;
//         dispatch({ type: types.FETCH_SUCCESS, payload: data });
//       })
//       .catch(error => {
//         dispatch({ type: types.FETCH_FAILURE, payload: getError(error) });
//       });
//   };
// };

const create = payload => {
  return function (dispatch) {
    dispatch({ type: types.CREATE_REQUEST });
    axios()
      .post(endpoint, payload)
      .then(response => {
        toast.success("Convite enviado com sucesso!");
        dispatch({ type: types.CREATE_SUCCESS, payload: response.data });
      })
      .catch(error => {
        toast.error(getError(error));
        dispatch({ type: types.CREATE_FAILURE, payload: getError(error) });
      });
  };
};


// const remove = payload => {
//   return function (dispatch) {
//     dispatch({ type: types.DELETE_REQUEST });
//     axios()
//       .delete(`${endpoint}/${payload}`)
//       .then(() => {
//         dispatch({ type: types.DELETE_SUCCESS });
//       })
//       .catch(error => {
//         dispatch({ type: types.DELETE_FAILURE, payload: getError(error) });
//       });
//   };
// };

export default {
  // fetch,
  create,
  // remove,
};
