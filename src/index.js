import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";
import AdminLayout from "layouts/Admin/Admin.js";
import SignIn from "layouts/SignIn/SignIn.js";

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/main.css";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/signIn" render={() => <SignIn />} />
        <Redirect exact from="/" to="/admin/dashboard" />
        <Redirect exact from="/admin" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
