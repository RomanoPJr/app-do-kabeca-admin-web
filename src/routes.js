import React from "react";
import {
  FaUserShield,
  FaTachometerAlt,
  FaBook,
  FaRegFlag,
  FaUsers
} from "react-icons/fa";

import Admins from "./views/Admins";
import Dashboard from "./views/Dashboard";
import Organizer from "./views/Organizer";
import EventSuggestion from "./views/EventSuggestion";
import StatuteSuggestion from "./views/StatuteSuggestion";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaTachometerAlt size={18} />,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/organizer",
    name: "Organizadores",
    icon: <FaUsers size={18} />,
    component: Organizer,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Administradores",
    icon: <FaUserShield size={18} />,
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/statute_suggestion",
    name: "Sugestão de Estatuto",
    icon: <FaBook size={18} />,
    component: StatuteSuggestion,
    layout: "/admin"
  },
  {
    path: "/event_suggestion",
    name: "Sugestões de Eventos",
    icon: <FaRegFlag size={18} />,
    component: EventSuggestion,
    layout: "/admin"
  }
];
export default routes;
