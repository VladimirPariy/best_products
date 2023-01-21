import React, { FC } from "react";

import styles from "components/product-detail-info/components/product-title.module.scss";

interface Props {
  title: string;
}

const ProductDetailTitle: FC<Props> = ({ title }) => {
  return <div className={styles.title}>{title}</div>;
};

export default ProductDetailTitle;
