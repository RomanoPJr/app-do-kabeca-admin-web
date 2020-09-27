import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";

import "./assets/fonts/DS-DIGI.ttf";
import "./assets/fonts/DS-DIGIB.ttf";
import "./assets/css/main.css";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-react.scss";

import Login from "./layouts/Login/index";
import SignIn from "./layouts/SignIn/SignIn.js";
import AdminLayout from "./layouts/Admin/Admin";
import "./assets/css/btn-style.css";

import history from "./history";

// window.addEventListener("beforeunload", ev => {
//   if (process.env.NODE_ENV !== "development") {
//     const is_redirect = localStorage.getItem("is-redirect");
//     localStorage.removeItem("is-redirect");
//     if (!is_redirect) {
//       localStorage.removeItem("user-token");
//     }
//   }
// });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Redirect exact from="/admin" to="/login" />
        <Redirect exact from="/organizer" to="/login" />

        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/sign-in" render={() => <SignIn />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/organizer" render={props => <AdminLayout {...props} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
