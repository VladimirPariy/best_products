import React, { FC } from "react";
import { useLocation } from "react-router";
import { Link, NavLink, useSearchParams } from "react-router-dom";

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
import {
  addIntoFavoriteTrigger,
  removeFromFavoriteTrigger,
} from "store/favorite-products/favorite-products-actions";
import { selectFavoriteProducts } from "store/favorite-products/favorite-products-selectors";
import { selectFeedbacks } from "store/feedbacks/feedbacks-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { selectUser } from "store/user/user-selector";
import { removeProductTrigger } from "store/product-control/product-control-actions";

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

  const dispatch = useAppDispatch();
  const { user_id, users_roles } = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const currentLocation = pathname.split("/");
  const isFavorite = favoriteProductsList.find(
    (item) => item.product_id === product_id
  );
  const isFeedback = useAppSelector(selectFeedbacks).find(
    (item) => item.product === product_id
  );
  const favoriteClassNames = getClassNameByCondition(
    styles,
    "favorite",
    "isFavorite",
    !!isFavorite,
    ""
  );

  const clickHandler = () => {
    const isFavorite = favoriteProductsList.find(
      (item) => item.product_id === product_id
    );
    const infoForChangeFavorite = { productId: product_id, userId: user_id };
    if (isFavorite) {
      dispatch(removeFromFavoriteTrigger(infoForChangeFavorite));
    } else {
      dispatch(addIntoFavoriteTrigger(infoForChangeFavorite));
    }
  };

  const linkPath =
    currentLocation[1] === "favorite"
      ? `${product_id}`
      : currentLocation[1] === "product" && currentLocation.length > 3
      ? `../../${product_id}`
      : `../${product_id}`;

  const deleteHandler = () => {
    dispatch(removeProductTrigger(product_id));
  };
  return (
    <div
      className={
        searchParams.get("view") === "list"
          ? styles.listContainer
          : styles.pileContainer
      }
      key={product_id}
    >
      <div className={favoriteClassNames} onClick={clickHandler}>
        <Favorites />
      </div>
      <NavLink to={linkPath}>
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
                return <CharacteristicItem char={char} key={index} />;
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
      </NavLink>
      {users_roles?.role_title === "admin" && (
        <div className={styles.controlContainer}>
          <button className={styles.edit}>
            <span>
              <Link to={"/"}>Edit</Link>
            </span>
          </button>
          <button className={styles.remove} onClick={deleteHandler}>
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
