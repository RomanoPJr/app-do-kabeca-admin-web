import React from "react";
import Admins from "./views/Admins.js";
import Dashboard from "views/Dashboard.jsx";
import { FaUserShield, FaTachometerAlt } from "react-icons/fa";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaTachometerAlt size={24} />,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: <FaUserShield size={24} />,
    component: Admins,
    layout: "/admin"
  }
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }
];
export default routes;
