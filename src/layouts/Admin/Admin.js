import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "routes.js";

const Admin = props => {
  const [backgroundColor] = useState();
  const [sidebarOpened, setSidebarOpened] = useState();

  function toggleSidebar() {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(!sidebarOpened);
  }

  function getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
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
    <>
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          toggleSidebar={toggleSidebar}
        />
        <div className="main-panel" data={backgroundColor}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            toggleSidebar={toggleSidebar}
            sidebarOpened={sidebarOpened}
          />
          <Switch>{getRoutes(routes)}</Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
