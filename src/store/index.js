import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import admin from "../store/admin/admin.reducers";
import session from "../store/session/session.reducers";
import organizer from "../store/organizer/organizer.reducers";
import eventSuggestion from "../store/eventSuggestion/eventSuggestion.reducers";
import statuteSuggestion from "../store/statuteSuggestion/statuteSuggestion.reducers";

const rootReducer = combineReducers({
  admin,
  session,
  organizer,
  eventSuggestion,
  statuteSuggestion
});

var store;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
