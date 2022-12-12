import AppRouter from "components/app-router/app-router";
import RegistrationModal from "components/registration-modal/registration-modal";
import {IModalScreens} from "lib/interfaces/modal-screens.interface";
import React, {FC} from "react";

import styles from "layout/content/content.module.scss";

import Sidebar from "components/sidebar/sidebar";
import {useScreenWidth} from "lib/hooks/use-screen-width";

interface Props extends IModalScreens {
  isShowRegistrationModal: boolean
  isShowLoginModal: boolean
  isShowAccountModal: boolean
}

const Content: FC<Props> = (props) => {
  const {isShowRegistrationModal, setIsShowRegistrationModal, isShowLoginModal, isShowAccountModal, setIsShowAccountModal, setIsShowLoginModal} = props;
  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar/>}
      {isShowRegistrationModal && <RegistrationModal setIsShowRegistrationModal={setIsShowRegistrationModal} isShowRegistrationModal={isShowRegistrationModal}/>}
      <AppRouter/>
    </div>
  );
};

export default Content;
