import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import user from "../store/user/user.reducers";
import club from "../store/club/club.reducers";
import event from "../store/event/event.reducers";
import admin from "../store/admin/admin.reducers";
import match from "../store/match/match.reducers";
import player from "../store/player/player.reducers";
import season from "../store/season/season.reducers";
import session from "../store/session/session.reducers";
import payment from "../store/payment/payment.reducers";
import sponsor from "../store/sponsor/sponsor.reducers";
import statute from "../store/statute/statute.reducers";
import location from "../store/location/location.reducers";
import organizer from "../store/organizer/organizer.reducers";
import match_invite from "../store/match_invite/match_invite.reducers";
import suggestion_statute from "../store/suggestion_statute/suggestion_statute.reducers";
import match_invite_confirmation from "../store/match_invite_confirmation/match_invite_confirmation.reducers";

const rootReducer = combineReducers({
  user,
  club,
  admin,
  event,
  match,
  season,
  player,
  session,
  payment,
  sponsor,
  statute,
  location,
  organizer,
  match_invite,
  suggestion_statute,
  match_invite_confirmation,
});

var store;

if (process.env.NODE_ENV === "development") {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk))
  )
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
