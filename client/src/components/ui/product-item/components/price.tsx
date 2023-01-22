import styles from "components/ui/product-item/product-item.module.scss";
import React, { FC } from "react";
import PriceIcon from "assets/icon/goods-statistics/price";

interface Props {
  price: string;
}

const Price: FC<Props> = ({ price }) => {
  return (
    <div className={styles.price}>
      <PriceIcon />
      <span>${price}</span>
    </div>
  );
};

export default Price;
