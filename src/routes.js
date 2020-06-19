import React from "react";
import {
  FaBook,
  FaUsers,
  FaFutbol,
  FaRegFlag,
  FaRunning,
  FaUserShield,
  FaDollarSign,
  FaRegHandshake
} from "react-icons/fa";

import Club from "./views/organizer/Club";
import Event from "./views/organizer/Event";
import Player from "./views/organizer/Player";
import Statute from "./views/organizer/Statute";
import Sponsor from "./views/organizer/Sponsor";
import Payment from "./views/organizer/Payment";

import Admins from "./views/admin/Admins";
import Organizer from "./views/admin/Organizer";
import SuggestionEvent from "./views/admin/SuggestionEvent";
import SuggestionStatute from "./views/admin/SuggestionStatute";

var admin = [
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
    component: SuggestionStatute,
    layout: "/admin"
  },
  {
    path: "/event_suggestions",
    name: "Sugestões de Eventos",
    icon: <FaRegFlag size={18} />,
    component: SuggestionEvent,
    layout: "/admin"
  }
];
var organizer = [
  {
    path: "/club",
    name: "Clube",
    icon: <FaFutbol size={18} />,
    component: Club,
    layout: "/organizer"
  },
  {
    path: "/players",
    name: "Jogadores",
    icon: <FaRunning size={18} />,
    component: Player,
    layout: "/organizer"
  },
  {
    path: "/sponsors",
    name: "Patrocinadores",
    icon: <FaRegHandshake size={22} />,
    component: Sponsor,
    layout: "/organizer"
  },
  {
    path: "/events",
    name: "Eventos de Partida",
    icon: <FaRegFlag size={18} />,
    component: Event,
    layout: "/organizer"
  },
  {
    path: "/statute",
    name: "Estatuto",
    icon: <FaBook size={18} />,
    component: Statute,
    layout: "/organizer"
  },
  {
    path: "/payments",
    name: "Financeiro",
    icon: <FaDollarSign size={18} />,
    component: Payment,
    layout: "/admin"
  }
];

export { admin, organizer };
