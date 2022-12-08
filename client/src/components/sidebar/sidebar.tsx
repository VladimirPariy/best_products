import logo from "layout/header/components/logo";
import {useScreenWidth} from "lib/hooks/use-screen-width";
import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import React, {FC, useState} from "react";
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
  const [onHover, setOnHover] = useState(false)
  const userScreenWidth = useScreenWidth()
  const onHoveredLink = getClassNameByCondition(styles, 'link', 'hoveredLink', onHover)
  console.log(onHover)
  return (
    <aside className={styles.sidebarWrapper} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
      <ul>
        {sidebarList.map(item => (
          <li className={onHoveredLink} key={item.title} >
            <NavLink to={item.url} className={({isActive}) => isActive ? styles.active : undefined
            }>
              <div className={styles.icon}>{item.icon}</div>
              {
                onHover && userScreenWidth > 768 && <div className={styles.title}>{item.title}</div>
              }
              {
                userScreenWidth < 768 && <div className={styles.title}>{item.title}</div>
              }
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;