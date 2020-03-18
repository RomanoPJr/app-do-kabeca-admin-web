import React from "react";
import { FaBook, FaRegFlag, FaUsers, FaUserShield } from "react-icons/fa";
import Admins from "./views/Admins";
import EventSuggestion from "./views/EventSuggestion";
import Organizer from "./views/Organizer";
import StatuteSuggestion from "./views/StatuteSuggestion";

var routes = [
  {
    path: "/admins",
    name: "Administradores",
    icon: <FaUserShield size={18} />,
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/organizers",
    name: "Organizadores",
    icon: <FaUsers size={18} />,
    component: Organizer,
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
    path: "/event_suggestions",
    name: "Sugestões de Eventos",
    icon: <FaRegFlag size={18} />,
    component: EventSuggestion,
    layout: "/admin"
  }
];
export default routes;
