import AppRouter from "components/app-router/app-router";
import RegistrationModal from "components/registration-modal/registration-modal";
import SignInModal from "components/sign-in-modal/sign-in-modal";
import { IModalScreens } from "lib/interfaces/modal-screens.interface";
import React, { FC } from "react";

import styles from "layout/content/content.module.scss";

import Sidebar from "components/sidebar/sidebar";
import { useScreenWidth } from "lib/hooks/use-screen-width";

interface Props extends IModalScreens {
  isShowRegistrationModal: boolean;
  isShowLoginModal: boolean;
  isShowAccountModal: boolean;
}

const Content: FC<Props> = (props) => {
  const {
    isShowRegistrationModal,
    setIsShowRegistrationModal,
    isShowLoginModal,
    setIsShowLoginModal,
    isShowAccountModal,
    setIsShowAccountModal,
  } = props;
  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar />}
      {isShowRegistrationModal && (
        <RegistrationModal
          setIsShowRegistrationModal={setIsShowRegistrationModal}
          isShowRegistrationModal={isShowRegistrationModal}
        />
      )}
      {isShowLoginModal && (
        <SignInModal
          isShowLoginModal={isShowLoginModal}
          setIsShowLoginModal={setIsShowLoginModal}
        />
      )}
      <AppRouter />
    </div>
  );
};

export default Content;
