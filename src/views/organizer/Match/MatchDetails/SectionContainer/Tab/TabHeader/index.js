import React from "react";
import { NavItem, NavLink } from "reactstrap";

export default ({ activeTab, setActiveTab, match }) => {
  return (
    <NavItem>
      <NavLink
        className={activeTab === match ? "active" : ""}
        onClick={() => {
          setActiveTab(match);
        }}
      >
        {match}
      </NavLink>
    </NavItem>
  );
};
