import React, { FC } from "react";

import styles from "components/product-detail/product-detail-info/components/product-counters.module.scss";

import ProductCounter from "components/product-detail/product-detail-info/components/product-counter";

import FavoriteCount from "assets/icon/goods-statistics/favorite-count";
import NegativeShape from "assets/icon/goods-statistics/negative-shape";
import Shape from "assets/icon/goods-statistics/shape";
import Views from "assets/icon/goods-statistics/views";

interface Props {
  negative_feedbacks_amount: number;
  positive_feedbacks_amount: number;
  favorites_amount: number;
  views_amount: number;
}

const ProductCounters: FC<Props> = ({
  positive_feedbacks_amount,
  negative_feedbacks_amount,
  views_amount,
  favorites_amount,
}) => {
  return (
    <div className={styles.counterContainer}>
      <ProductCounter counter={views_amount} icon={<Views />} />
      <ProductCounter counter={favorites_amount} icon={<FavoriteCount />} />
      <ProductCounter counter={positive_feedbacks_amount} icon={<Shape />} />
      <ProductCounter
        counter={negative_feedbacks_amount}
        icon={<NegativeShape />}
      />
    </div>
  );
};

export default ProductCounters;
