import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import admin from "../store/admin/admin.reducers";
import session from "../store/session/session.reducers";

const rootReducer = combineReducers({
  admin,
  session
});
console.log(process.env.NODE_ENV);
const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null;
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devTools)
);

export default store;
