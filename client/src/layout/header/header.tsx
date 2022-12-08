import React, { FC, useState } from "react";

import styles from "layout/header/header.module.scss";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import UserModal from "layout/header/components/user-modal";
import BurgerMenu from "layout/header/components/burger-menu";
import Sidebar from "components/sidebar/sidebar";
import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";

interface Props {
  isShowUserModal?: boolean;
  setIsShowUserModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<Props> = ({ isShowUserModal, setIsShowUserModal }) => {
  const [checkedBurgerMenu, setCheckedBurgerMenu] = useState<boolean>(false);
  const userScreenWidth = useScreenWidth();

  return userScreenWidth > 768 ? (
    <>
      <section className={styles.headerContainer}>
        <Logo />
        <Search />
        <User showModal={setIsShowUserModal} />
        {isShowUserModal && <UserModal />}
      </section>
    </>
  ) : (
    <>
      <section className={styles.headerContainer}>
        <div className={styles.visibleHeader}>
          <Logo />
          <BurgerMenu
            value={checkedBurgerMenu}
            checkedHandler={setCheckedBurgerMenu}
          />
        </div>
        <div
          className={`${
            checkedBurgerMenu
              ? styles["visible_burger_menu_content"]
              : styles["not_visible_burger_menu_content"]
          }`}
        >
          <Search />
          <User />
          <Sidebar />
        </div>
      </section>
    </>
  );
};

export default Header;
