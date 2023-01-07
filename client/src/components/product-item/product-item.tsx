import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "components/product-item/product-item.module.scss";

import { apiUrls } from "lib/enums/api-urls";
import { IProduct } from "lib/interfaces/products/product";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import FavoriteCount from "assets/icon/goods-statistics/favorite-count";
import NegativeShape from "assets/icon/goods-statistics/negative-shape";
import Price from "assets/icon/goods-statistics/price";
import Shape from "assets/icon/goods-statistics/shape";
import Favorites from "assets/icon/general/favorites";
import Views from "assets/icon/goods-statistics/views";

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
          <div className={styles.productTitle}>{product_title}</div>
          <div className={styles.price}>
            <Price />
            <span>${price}</span>
          </div>
        </>
      )}
      <div className={styles.image}>
        <img
          src={`${apiUrls.BASE_Image_URL}${product_images[0].image_title}`}
          alt="product img"
        />
      </div>
      {searchParams.get("view") === "list" && (
        <div className={styles.infoContainer}>
          <div className={styles.productTitle}>{product_title}</div>
          <div className={styles.characteristics}>
            {characteristics.map((char, index) => {
              if (index > 1) return false;
              return (
                <div key={char.characteristic_id}>
                  <span className={styles.charTitle}>
                    {char.parameters.parameter_title.at(0)?.toUpperCase()}
                    {char.parameters.parameter_title.slice(1)?.toLowerCase()}:
                  </span>
                  <span>{char.characteristic_title}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.price}>
            <Price />
            <span>${price}</span>
          </div>
        </div>
      )}
      <div className={styles.containerForCounters}>
        <div className={styles.views}>
          <span className={styles.icon}>
            <Views />
          </span>
          <span>{number_of_views}</span>
        </div>
        <div className={styles.favoriteCounter}>
          <span className={styles.icon}>
            <FavoriteCount />
          </span>
          <span>{number_of_favorites}</span>
        </div>
        <div className={styles.positiveFeedbacks}>
          <span className={styles.icon}>
            <Shape />
          </span>
          <span>{positive_feedbacks}</span>
        </div>
        <div className={styles.negativeFeedbacks}>
          <span className={styles.icon}>
            <NegativeShape />
          </span>
          <span>{negative_feedbacks}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
