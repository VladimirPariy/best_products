import React, { FC } from "react";

import styles from "layout/content/content.module.scss";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import MainContainer from "components/ui/main-container/main-container";
import ModalContainer from "components/ui/modal-container/modal-container";
import Sidebar from "components/sidebar/sidebar";

const Content: FC = () => {
  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar />}
      <ModalContainer />
      <MainContainer />
    </div>
  );
};

export default Content;
