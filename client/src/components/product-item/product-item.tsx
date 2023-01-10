import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "components/product-item/product-item.module.scss";
import FavoriteCount from "assets/icon/goods-statistics/favorite-count";
import NegativeShape from "assets/icon/goods-statistics/negative-shape";
import Shape from "assets/icon/goods-statistics/shape";
import Favorites from "assets/icon/general/favorites";
import Views from "assets/icon/goods-statistics/views";

import { IProduct } from "lib/interfaces/products/product";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

import CharacteristicItem from "components/product-item/components/characteristic-item";
import CountItem from "components/product-item/components/count-item";
import Image from "components/product-item/components/image";
import Price from "components/product-item/components/price";
import ProductTitle from "components/product-item/components/product-title";

interface Props extends IProduct {}

const ProductItem: FC<Props> = (props) => {
  const {
    product_id,
    product_images,
    product_title,
    characteristics,
    number_of_favorites,
    number_of_views,
    price,
    negative_feedbacks,
    positive_feedbacks,
  } = props;

  let [searchParams] = useSearchParams();
  const isFavorite = false;
  const favoriteClassNames = getClassNameByCondition(
    styles,
    "favorite",
    "isFavorite",
    isFavorite,
    ""
  );
  return (
    <div
      className={
        searchParams.get("view") === "list"
          ? styles.listContainer
          : styles.pileContainer
      }
      key={product_id}
    >
      <div className={favoriteClassNames}>
        <Favorites />
      </div>
      {!(searchParams.get("view") === "list") && (
        <>
          <ProductTitle product_title={product_title} />
          <Price price={price} />
        </>
      )}
      <Image product_images={product_images} />
      {searchParams.get("view") === "list" && (
        <div className={styles.infoContainer}>
          <ProductTitle product_title={product_title} />
          <div className={styles.characteristics}>
            {characteristics.map((char, index) => {
              if (index > 1) return false;
              return (
                <CharacteristicItem char={char} key={char.characteristic_id} />
              );
            })}
          </div>
          <Price price={price} />
        </div>
      )}
      <div className={styles.containerForCounters}>
        <CountItem
          value={number_of_views}
          children={<Views />}
          className={styles.views}
        />
        <CountItem
          value={number_of_favorites}
          children={<FavoriteCount />}
          className={styles.favoriteCounter}
        />
        <CountItem
          value={positive_feedbacks}
          children={<Shape />}
          className={styles.positiveFeedbacks}
        />
        <CountItem
          value={negative_feedbacks}
          children={<NegativeShape />}
          className={styles.negativeFeedbacks}
        />
      </div>
    </div>
  );
};

export default ProductItem;
