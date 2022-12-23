import MainContainer from "components/ui/main-container/main-container";
import ModalContainer from "components/ui/modal-container/modal-container";
import React, { FC, useEffect } from "react";

import styles from "layout/content/content.module.scss";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import Sidebar from "components/sidebar/sidebar";

interface Props extends IModalScreens {
  isShowRegistrationModal: boolean;
  isShowLoginModal: boolean;
  isShowAccountModal: boolean;
}

const Content: FC<Props> = (props) => {
  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar />}
      <ModalContainer {...props} />
      <MainContainer />
    </div>
  );
};

export default Content;
