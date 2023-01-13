import React, { FC, ReactNode } from "react";
import styles from "pages/products/layout-page/components/layout-page-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const PageLayoutWrapper: FC<Props> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default PageLayoutWrapper;
