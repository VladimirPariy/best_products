import styles from "components/sidebar/components/sidebar-item.module.scss";
import { ISidebarList } from "lib/interfaces/sidebar/sidebar.interface";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import React, { Dispatch, FC, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  onHover: boolean;
  item: ISidebarList;
  setChecked?: Dispatch<SetStateAction<boolean>>;
}

const SidebarItem: FC<Props> = ({ setChecked, item, onHover }) => {
  const onHoveredLink = getClassNameByCondition(
    styles,
    "link",
    "hoveredLink",
    onHover
  );
  return (
    <li className={onHoveredLink}>
      <NavLink
        to={item.url}
        className={({ isActive }) => (isActive ? styles.active : null)}
        onClick={() => setChecked && setChecked(false)}
      >
        <div className={styles.icon}>{item.icon}</div>
        <div className={styles.title}>{item.title}</div>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
