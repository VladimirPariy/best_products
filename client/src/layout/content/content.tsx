import AppRouter from "components/app-router/app-router";
import React, { FC } from "react";

import styles from "layout/content/content.module.scss";

import Sidebar from "components/sidebar/sidebar";
import { useScreenWidth } from "lib/hooks/use-screen-width";

const Content: FC = () => {
  const userScreenWidth = useScreenWidth();
  return (
    <div className={styles.mainWrapper}>
      {userScreenWidth <= 768 ? null : <Sidebar />}
      <AppRouter/>
    </div>
  );
};

export default Content;
