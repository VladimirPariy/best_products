import React, { FC, Dispatch, SetStateAction } from "react";

import styles from "layout/header/header.module.scss";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";
import Sidebar from "components/sidebar/sidebar";
import BurgerMenu from "layout/header/components/burger-menu";
import Logo from "layout/header/components/logo";
import Search from "components/search/search";
import User from "layout/header/components/user";

interface Props extends IModalScreens {
  checkedBurgerMenu: boolean;
  setCheckedBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

const PhoneHeader: FC<Props> = (props) => {
  const { checkedBurgerMenu, setCheckedBurgerMenu, ...setIsShowModals } = props;

  const classNameByMenu = `${
    checkedBurgerMenu
      ? styles["visible_burger_menu_content"]
      : styles["not_visible_burger_menu_content"]
  }`;

  return (
    <>
      <section className={styles.headerContainer}>
        <div className={styles.visibleHeader}>
          <Logo />
          <BurgerMenu
            checkedBurgerMenu={checkedBurgerMenu}
            setCheckedBurgerMenu={setCheckedBurgerMenu}
          />
        </div>
        <div className={classNameByMenu}>
          <Search />
          <User
            setCheckedBurgerMenu={setCheckedBurgerMenu}
            {...setIsShowModals}
          />
          <Sidebar setCheckedBurgerMenu={setCheckedBurgerMenu} />
        </div>
      </section>
    </>
  );
};

export default PhoneHeader;
