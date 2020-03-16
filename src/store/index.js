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

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
