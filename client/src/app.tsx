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

  console.log(`isShowRegistrationModal:${isShowRegistrationModal}
  isShowLoginModal:${isShowLoginModal}
  isShowAccountModal:${isShowAccountModal}
  `);

  const mainClickHandler = () => {
    setIsShowUserModal(false);
    setIsShowRegistrationModal(false);
    setIsShowLoginModal(false);
    setIsShowAccountModal(false);
  };

  const modalContext = {
    isShowUserModal,
    setIsShowUserModal,
    setIsShowRegistrationModal,
    setIsShowLoginModal,
    setIsShowAccountModal,
  };

  return (
    <main className={styles.wrapper} onClick={mainClickHandler}>
      <Header {...modalContext} />
      <Content />
    </main>
  );
};

export default App;
