import React from "react";
import { NavItem, NavLink } from "reactstrap";

export default ({ activeTab, setActiveTab, round }) => {
  return (
    <NavItem>
      <NavLink
        className={activeTab === round ? "active" : ""}
        onClick={() => {
          setActiveTab(round);
        }}
      >
        {round}
      </NavLink>
    </NavItem>
  );
};
