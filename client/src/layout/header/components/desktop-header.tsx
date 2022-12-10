import React, { FC, Dispatch, SetStateAction } from "react";

import styles from "layout/header/header.module.scss";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";
import Logo from "layout/header/components/logo";
import Search from "layout/header/components/search";
import User from "layout/header/components/user";
import UserModal from "layout/header/components/user-modal";

interface Props extends IModalScreens {
  isShowUserModal: boolean;
  setIsShowUserModal: Dispatch<SetStateAction<boolean>>;
}

const DesktopHeader: FC<Props> = (props) => {
  const { isShowUserModal, ...setIsShowModals } = props;
  return (
    <>
      <section className={styles.headerContainer}>
        <Logo />
        <Search />
        <User {...setIsShowModals} />
        {isShowUserModal && <UserModal {...setIsShowModals} />}
      </section>
    </>
  );
};

export default DesktopHeader;
