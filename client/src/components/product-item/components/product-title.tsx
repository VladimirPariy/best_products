import styles from "components/product-item/product-item.module.scss";
import React, { FC } from "react";

interface Props {
  product_title: string;
}

const ProductTitle: FC<Props> = ({ product_title }) => {
  return <div className={styles.productTitle}>{product_title}</div>;
};

export default ProductTitle;
