import React, { FC } from "react";

import styles from "layout/header/header.module.scss";

import Logo from "layout/header/components/logo";
import SearchBar from "components/search/search-bar";
import User from "layout/header/components/user";
import UserModal from "layout/header/components/user-modal";

import { selectUserModal } from "store/modals/modals-selectors";
import { useAppSelector } from "store/store-types";

const DesktopHeader: FC = () => {
  const isShowUserModal = useAppSelector(selectUserModal);
  return (
    <>
      <section className={styles.headerContainer}>
        <Logo />
        <SearchBar />
        <User />
        {isShowUserModal && <UserModal />}
      </section>
    </>
  );
};

export default DesktopHeader;
