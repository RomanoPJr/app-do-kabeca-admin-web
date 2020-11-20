import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

import history from "../../history";
import { admin, organizer, players } from "../../routes";
import ClubActions from "../../store/club/club.actions";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import SessionActions from "../../store/session/session.actions";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";

const Admin = ({ fetchSession, fetchClub, session, ...props }) => {
  const [routes, setRoutes] = useState([]);
  const [sidebarOpened, setSidebarOpened] = useState();

  useEffect(() => {
    if (session.data) {
      switch (session.data.type) {
        case "ADMIN":
          setRoutes(admin);
          break;
        case "ORGANIZER":
          setRoutes(organizer);
          break;
        case "PLAYER":
          setRoutes(players);
          break;
        default:
          setRoutes(players);
          break;
      }
      fetchClub();

    }
  }, [session.data]);

  useEffect(() => {
    const token = localStorage.getItem("user-token");

    if (!token) {
      return history.replace("/login");
    }

    fetchSession();
  }, []);

  function toggleSidebar() {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(!sidebarOpened);
  }

  function getRoutes(routes) {
    return routes.map((prop, key) => {
      return (
        <Route
          exact
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  }

  function getBrandText(path) {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  }

  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} toggleSidebar={toggleSidebar} />
      <div className="main-panel">
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          toggleSidebar={toggleSidebar}
          sidebarOpened={sidebarOpened}
        />
        <Switch>{getRoutes(routes)}</Switch>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchSession: () => dispatch(SessionActions.fetch(dispatch)),
  fetchClub: () => dispatch(ClubActions.fetch(dispatch))
});

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
