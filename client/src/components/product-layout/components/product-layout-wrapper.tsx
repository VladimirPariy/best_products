import React, { FC, ReactNode } from "react";
import styles from "components/product-layout/components/layout-page-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const ProductLayoutWrapper: FC<Props> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ProductLayoutWrapper;
