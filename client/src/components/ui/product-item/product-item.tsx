import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "components/ui/product-item/product-item.module.scss";
import FavoriteCount from "assets/icon/goods-statistics/favorite-count";
import NegativeShape from "assets/icon/goods-statistics/negative-shape";
import Shape from "assets/icon/goods-statistics/shape";
import Favorites from "assets/icon/general/favorites";
import Views from "assets/icon/goods-statistics/views";

import { IProduct } from "lib/interfaces/products/product.interface";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

import CharacteristicItem from "components/ui/product-item/components/characteristic-item";
import CountItem from "components/ui/product-item/components/count-item";
import Image from "components/ui/product-item/components/image";
import Price from "components/ui/product-item/components/price";
import ProductTitle from "components/ui/product-item/components/product-title";
import { selectFavoriteProducts } from "store/favorite-products/favorite-products-selectors";
import { useAppSelector } from "store/store-types";

interface Props extends IProduct {}

const ProductItem: FC<Props> = (props) => {
  const {
    product_id,
    product_images,
    product_title,
    characteristics,
    price,
    negative_feedbacks_amount,
    positive_feedbacks_amount,
    favorites_amount,
    views_amount,
  } = props;

  let [searchParams] = useSearchParams();
  const favoriteProductsList = useAppSelector(selectFavoriteProducts);

  const isFavorite = favoriteProductsList.find(
    (item) => item.product_id === product_id
  );

  const favoriteClassNames = getClassNameByCondition(
    styles,
    "favorite",
    "isFavorite",
    !!isFavorite,
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
          value={views_amount}
          children={<Views />}
          className={styles.views}
        />
        <CountItem
          value={favorites_amount}
          children={<FavoriteCount />}
          className={styles.favoriteCounter}
        />
        <CountItem
          value={positive_feedbacks_amount}
          children={<Shape />}
          className={styles.positiveFeedbacks}
        />
        <CountItem
          value={negative_feedbacks_amount}
          children={<NegativeShape />}
          className={styles.negativeFeedbacks}
        />
      </div>
    </div>
  );
};

export default ProductItem;
