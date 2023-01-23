import React, { FC } from "react";

import styles from "layout/header/header.module.scss";

import Sidebar from "components/sidebar/sidebar";
import BurgerMenu from "layout/header/components/burger-menu";
import Logo from "layout/header/components/logo";
import SearchBar from "components/search/search-bar";
import User from "layout/header/components/user";
import { selectBurgerMenu } from "store/modals/modals-selectors";
import { useAppSelector } from "store/store-types";

const PhoneHeader: FC = () => {
  const checkedBurgerMenu = useAppSelector(selectBurgerMenu);
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
          <BurgerMenu />
        </div>
        <div className={classNameByMenu} onClick={(e) => e.stopPropagation()}>
          <SearchBar />
          <User />
          <Sidebar />
        </div>
      </section>
    </>
  );
};

export default PhoneHeader;
