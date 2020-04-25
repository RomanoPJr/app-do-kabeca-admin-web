import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import user from "../store/user/user.reducers";
import club from "../store/club/club.reducers";
import event from "../store/event/event.reducers";
import admin from "../store/admin/admin.reducers";
import player from "../store/player/player.reducers";
import session from "../store/session/session.reducers";
import payment from "../store/payment/payment.reducers";
import sponsor from "../store/sponsor/sponsor.reducers";
import organizer from "../store/organizer/organizer.reducers";
import suggestion_event from "../store/suggestion_event/suggestion_event.reducers";
import suggestion_statute from "../store/suggestion_statute/suggestion_statute.reducers";

const rootReducer = combineReducers({
  user,
  club,
  admin,
  event,
  player,
  session,
  payment,
  sponsor,
  organizer,
  suggestion_event,
  suggestion_statute,
});

var store;

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
