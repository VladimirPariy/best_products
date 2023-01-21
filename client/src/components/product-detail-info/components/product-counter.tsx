import React, { FC } from "react";

import styles from "components/product-detail-info/components/product-counter.module.scss";

interface Props {
  counter: number;
  icon: JSX.Element;
}

const ProductCounter: FC<Props> = ({ icon, counter }) => {
  return (
    <div className={styles.counterContainer}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.count}>{counter}</span>
    </div>
  );
};

export default ProductCounter;
