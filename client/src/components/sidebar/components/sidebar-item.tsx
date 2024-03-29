import React, { FC, MouseEvent } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/sidebar/components/sidebar-item.module.scss";

import { ISidebarList } from "lib/interfaces/sidebar.interface";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  onHover: boolean;
  item: ISidebarList;
  clickHandler?: (e: MouseEvent<HTMLAnchorElement>, item: ISidebarList) => void;
}

const SidebarItem: FC<Props> = ({ item, onHover, clickHandler }) => {
  const onHoveredLink = getClassNameByCondition(
    styles,
    "link",
    "hoveredLink",
    onHover
  );

  const onHoveredTitle = getClassNameByCondition(
    styles,
    "title",
    "hoveredTitle",
    onHover
  );

  const linkHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    clickHandler && clickHandler(e, item);
  };

  const activeClassName = (data: { isActive: boolean; isPending: boolean }) => {
    return data.isActive ? styles.active : null;
  };
  return (
    <li className={onHoveredLink}>
      <NavLink to={item.url} className={activeClassName} onClick={linkHandler}>
        <div className={styles.icon}>{item.icon}</div>
        <div className={onHoveredTitle}>{item.title}</div>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
