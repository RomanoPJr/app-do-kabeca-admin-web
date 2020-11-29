import React from "react";
import {
  FaBook,
  FaUsers,
  FaFutbol,
  FaRegFlag,
  FaRunning,
  FaUserShield,
  FaDollarSign,
  FaRegHandshake,
  FaNewspaper
} from "react-icons/fa";

import Club from "./views/organizer/Club";
import Event from "./views/organizer/Event";
import Match from "./views/organizer/Match";
import Player from "./views/organizer/Player";
import Statute from "./views/organizer/Statute";
import Sponsor from "./views/organizer/Sponsor";
import Payment from "./views/organizer/Payment";
import Report from "./views/organizer/Report";

import Admins from "./views/admin/Admins";
import Organizer from "./views/admin/Organizer";
import SuggestionStatute from "./views/admin/SuggestionStatute";
import MatchDetails from "./views/organizer/Match/MatchDetails/index";

var admin = [
  {
    path: "/admins",
    name: "Administradores",
    icon: <FaUserShield size={18} />,
    component: Admins,
  },
  {
    path: "/organizers",
    name: "Organizadores",
    icon: <FaUsers size={18} />,
    component: Organizer,
  },
  {
    path: "/statute_suggestion",
    name: "Sugestão de Estatuto",
    icon: <FaBook size={18} />,
    component: SuggestionStatute,
  },
];
var organizer = [
  {
    path: "/club",
    name: "Clube",
    icon: <FaUsers size={18} />,
    component: Club,
  },
  {
    path: "/matches",
    name: "Peladas",
    icon: <FaFutbol size={18} />,
    component: Match,
  },
  {
    path: "/matches/:date",
    name: "Partida",
    icon: <FaFutbol size={18} />,
    component: MatchDetails,
    showOnMenu: false
  },
  {
    path: "/players",
    name: "Jogadores",
    icon: <FaRunning size={18} />,
    component: Player,
  },
  {
    path: "/sponsors",
    name: "Patrocinadores",
    icon: <FaRegHandshake size={22} />,
    component: Sponsor,
  },
  {
    path: "/events",
    name: "CRITÉRIOS DE PONTUAÇÃO",
    icon: <FaRegFlag size={18} />,
    component: Event,
  },
  {
    path: "/statute",
    name: "Estatuto",
    icon: <FaBook size={18} />,
    component: Statute,
  },
  {
    path: "/payments",
    name: "Financeiro",
    icon: <FaDollarSign size={18} />,
    component: Payment,
  },
  {
    path: "/reports",
    name: "Relatórios",
    icon: <FaNewspaper size={18} />,
    component: Report,
  }
];
var player = [
  {
    path: "/club",
    name: "Clube",
    icon: <FaUsers size={18} />,
    component: Club,
  },
  {
    path: "/matches",
    name: "Peladas",
    icon: <FaFutbol size={18} />,
    component: Match,
  },
  {
    path: "/matches/:date",
    name: "Partida",
    icon: <FaFutbol size={18} />,
    component: MatchDetails,
    showOnMenu: false
  },
  {
    path: "/events",
    name: "CRITÉRIOS DE PONTUAÇÃO",
    icon: <FaRegFlag size={18} />,
    component: Event,
  },
  {
    path: "/statute",
    name: "Estatuto",
    icon: <FaBook size={18} />,
    component: Statute,
  },
  {
    path: "/payments",
    name: "Financeiro",
    icon: <FaDollarSign size={18} />,
    component: Payment,
  },
  {
    path: "/reports",
    name: "Relatórios",
    icon: <FaNewspaper size={18} />,
    component: Report,
  }
];

export { admin, organizer, player };
