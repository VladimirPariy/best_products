import React from "react";

import Home from "assets/icon/sidebar/home";
import Favorites from "assets/icon/general/favorites";
import Categories from "assets/icon/sidebar/categories";

import { ISidebarList } from "lib/interfaces/sidebar/sidebar.interface";
import { appUrl } from "lib/enums/app-urls";

export const sidebarList: ISidebarList[] = [
  { title: "Home", icon: <Home />, url: appUrl.home, id: 1 },
  { title: "Favorites", icon: <Favorites />, url: appUrl.favorites, id: 2 },
  { title: "Categories", icon: <Categories />, url: appUrl.categories, id: 3 },
];
