import React, {FC} from "react";

import styles from "components/product-info/components/product-price.module.scss";

import Price from "assets/icon/goods-statistics/price";

interface Props {
  price: string;
}

const ProductPrice: FC<Props> = ({price}) => {
  return (
    <div className={styles.priceContainer}>
      <span className={styles.icon}><Price/></span>
      <span className={styles.price}>${price}</span>
    </div>
  );
};

export default ProductPrice;