/*eslint-disable*/
import React from "react";
import { Nav } from "reactstrap";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    const { routes } = this.props;

    return (
      <div className="sidebar" data="blue">
        <div className="sidebar-wrapper" ref="sidebar">
          <div className="logo">
            <a
              className="simple-text logo-normal"
              target="_blank"
              styles="display:flex;text-align:center;"
              onClick={this.props.toggleSidebar}
            >
              App do Kabeça
            </a>
          </div>
          <Nav>
            {routes.map(
              (prop, key) =>
                prop.showOnMenu !== false && (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                      onClick={this.props.toggleSidebar}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {prop.icon}
                        <div style={{ marginLeft: "8px" }}>{prop.name}</div>
                      </div>
                    </NavLink>
                  </li>
                )
            )}
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default Sidebar;
