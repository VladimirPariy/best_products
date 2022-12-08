import React, {FC} from "react";
import {NavLink} from "react-router-dom";

import styles from "components/sidebar/sidebar.module.scss";

import {appUrl} from "lib/enums/app-urls";

import Home from "assets/icon/sidebar/home";
import Favorites from "assets/icon/general/favorites";
import Categories from "assets/icon/sidebar/categories";


interface ISidebarList {
  title: string;
  url: string;
  icon: JSX.Element
}

const sidebarList: ISidebarList[] = [
  {title: 'Home', icon: <Home/>, url: appUrl.home},
  {title: 'Favorites', icon: <Favorites/>, url: appUrl.favorites},
  {title: 'Categories', icon: <Categories/>, url: appUrl.categories},
]

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebarWrapper}>
      {sidebarList.map(item => (
        <NavLink to={item.url} key={item.title} className={styles.link}>
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.title}>{item.title}</div>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;