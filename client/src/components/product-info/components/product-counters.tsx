import React, {FC} from "react";

import styles from "components/product-info/components/product-counters.module.scss";

import ProductCounter from "components/product-info/components/product-counter";

import FavoriteCount from "assets/icon/goods-statistics/favorite-count";
import NegativeShape from "assets/icon/goods-statistics/negative-shape";
import Shape from "assets/icon/goods-statistics/shape";
import Views from "assets/icon/goods-statistics/views";

interface Props {
  negative_feedbacks: number;
  number_of_favorites: number;
  number_of_views: number;
  positive_feedbacks: number;
}

const ProductCounters: FC<Props> = ({positive_feedbacks, negative_feedbacks, number_of_views, number_of_favorites}) => {
  return (
    <div className={styles.counterContainer}>
      <ProductCounter counter={number_of_views} icon={<Views/>}/>
      <ProductCounter counter={number_of_favorites} icon={<FavoriteCount/>}/>
      <ProductCounter counter={positive_feedbacks} icon={<Shape/>}/>
      <ProductCounter counter={negative_feedbacks} icon={<NegativeShape/>}/>
    </div>
  );
};

export default ProductCounters;