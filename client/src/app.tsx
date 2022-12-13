import React, { FC, useState } from "react";

import styles from "app.module.scss";

import Header from "layout/header/header";
import Content from "layout/content/content";

const App: FC = () => {
  const [isShowUserModal, setIsShowUserModal] = useState<boolean>(false);
  const [isShowRegistrationModal, setIsShowRegistrationModal] =
    useState<boolean>(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false);
  const [isShowAccountModal, setIsShowAccountModal] = useState<boolean>(false);

  const mainClickHandler = () => {
    setIsShowUserModal(false);
    setIsShowRegistrationModal(false);
    setIsShowLoginModal(false);
    setIsShowAccountModal(false);
  };

  const setIsShowModals = {
    isShowUserModal,
    setIsShowUserModal,
    setIsShowRegistrationModal,
    setIsShowLoginModal,
    setIsShowAccountModal,
  };

  const isShowModalUseState = {
    isShowRegistrationModal,
    isShowLoginModal,
    isShowAccountModal,
    ...setIsShowModals,
  };

  return (
    <main className={styles.wrapper} onClick={mainClickHandler}>
      <Header {...setIsShowModals} />
      <Content {...isShowModalUseState} />
    </main>
  );
};

export default App;
