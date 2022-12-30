import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import styles from "components/sidebar/sidebar.module.scss";
import SidebarItem from "components/sidebar/components/sidebar-item";
import { sidebarList } from "components/sidebar/sidebar.data";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { useAppDispatch } from "lib/store/store-types";
import { categoriesTrigger } from "lib/store/categories/categories-actions";

interface Props {
  setCheckedBurgerMenu?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<Props> = ({ setCheckedBurgerMenu }) => {
  const dispatch = useAppDispatch();
  const [onHover, setOnHover] = useState(false);

  const onHoveredWrapper = getClassNameByCondition(
    styles,
    "sidebarWrapper",
    "hoveredSidebarWrapper",
    onHover
  );

  useEffect(() => {
    dispatch(categoriesTrigger());
  }, [dispatch]);

  return (
    <aside>
      <nav
        className={onHoveredWrapper}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <ul>
          {sidebarList.map((item) => (
            <SidebarItem
              onHover={onHover}
              item={item}
              setChecked={setCheckedBurgerMenu}
              key={item.title}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
