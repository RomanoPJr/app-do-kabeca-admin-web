import React from 'react'
import Login from "./layouts/Login/index";
import SignIn from "./layouts/SignIn/SignIn.js";
import AdminLayout from "./layouts/Admin/Admin";

import { Router, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";

import history from "./history";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/sign-in" render={() => <SignIn />} />
          <Route path="/" render={props => <AdminLayout {...props} />} />
        </Switch>
      </Router>
   </Provider>
  )
}

export default App;