import { categoriesTrigger } from "lib/store/categories/categories-actions";
import { useAppDispatch } from "lib/store/store-types";
import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/sidebar/sidebar.module.scss";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { appUrl } from "lib/enums/app-urls";

import Home from "assets/icon/sidebar/home";
import Favorites from "assets/icon/general/favorites";
import Categories from "assets/icon/sidebar/categories";

interface ISidebarList {
  title: string;
  url: string;
  icon: JSX.Element;
}

const sidebarList: ISidebarList[] = [
  { title: "Home", icon: <Home />, url: appUrl.home },
  { title: "Favorites", icon: <Favorites />, url: appUrl.favorites },
  { title: "Categories", icon: <Categories />, url: appUrl.categories },
];

interface Props {
  setCheckedBurgerMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<Props> = ({ setCheckedBurgerMenu }) => {
  const dispatch = useAppDispatch();
  const [onHover, setOnHover] = useState(false);
  const onHoveredLink = getClassNameByCondition(
    styles,
    "link",
    "hoveredLink",
    onHover
  );
  const onHoveredWrapper = getClassNameByCondition(
    styles,
    "sidebarWrapper",
    "hoveredSidebarWrapper",
    onHover
  );

  useEffect(() => {
    dispatch(categoriesTrigger());
  }, []);

  return (
    <aside>
      <nav
        className={onHoveredWrapper}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <ul>
          {sidebarList.map((item) => (
            <li className={onHoveredLink} key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) => (isActive ? styles.active : null)}
                onClick={() =>
                  setCheckedBurgerMenu && setCheckedBurgerMenu(false)
                }
              >
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.title}>{item.title}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
