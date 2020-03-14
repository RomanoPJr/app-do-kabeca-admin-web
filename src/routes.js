import React from "react";
import { FaUserShield, FaTachometerAlt, FaBook } from "react-icons/fa";

import Admins from "./views/Admins";
import Dashboard from "./views/Dashboard";
import StatuteSuggestion from "./views/StatuteSuggestion";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaTachometerAlt size={20} />,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Administradores",
    icon: <FaUserShield size={20} />,
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/statute_suggestion",
    name: "Sugestão de Estatuto",
    icon: <FaBook size={20} />,
    component: StatuteSuggestion,
    layout: "/admin"
  }
];
export default routes;
