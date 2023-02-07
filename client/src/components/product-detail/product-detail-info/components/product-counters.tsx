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

interface ICounter {
  counter: number;
  icon: JSX.Element;
}

const ProductCounters: FC<Props> = ({
  positive_feedbacks_amount,
  negative_feedbacks_amount,
  views_amount,
  favorites_amount,
}) => {
  const counters: ICounter[] = [
    { counter: views_amount, icon: <Views /> },
    { counter: favorites_amount, icon: <FavoriteCount /> },
    { counter: positive_feedbacks_amount, icon: <Shape /> },
    { counter: negative_feedbacks_amount, icon: <NegativeShape /> },
  ];
  return (
    <div className={styles.counterContainer}>
      {counters.map((item, index) => (
        <ProductCounter key={index} counter={item.counter} icon={item.icon} />
      ))}
    </div>
  );
};

export default ProductCounters;
