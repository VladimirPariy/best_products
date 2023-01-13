import React, { FC, ReactNode } from "react";
import styles from "pages/home/components/main-page-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const MainPageWrapper: FC<Props> = ({ children }) => {
  return <div className={styles.mainPage}>{children}</div>;
};

export default MainPageWrapper;
