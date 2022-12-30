import Home from "assets/icon/sidebar/home";
import Favorites from "assets/icon/general/favorites";
import Categories from "assets/icon/sidebar/categories";
import { ISidebarList } from "lib/interfaces/sidebar/sidebar.interface";
import { appUrl } from "lib/enums/app-urls";
import React from "react";

export const sidebarList: ISidebarList[] = [
  { title: "Home", icon: <Home />, url: appUrl.home },
  { title: "Favorites", icon: <Favorites />, url: appUrl.favorites },
  { title: "Categories", icon: <Categories />, url: appUrl.categories },
];
