import React, { FC, MouseEvent } from "react";
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
import { addFeedbackTrigger } from "store/feedbacks/feedbacks-actions";
import { selectFeedbacks } from "store/feedbacks/feedbacks-selectors";
import { setVisibilitySignInModal } from "store/modals/modals-actions";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
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
    if (!user_id) {
      dispatch(setVisibilitySignInModal(true));
      return;
    }
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

  let positiveFeedbackClassName = getClassNameByCondition(
    styles,
    "positiveFeedbacks",
    "feedback",
    !!isFeedback,
    ""
  );
  let negativeFeedbackClassName = getClassNameByCondition(
    styles,
    "negativeFeedbacks",
    "feedback",
    !!isFeedback,
    ""
  );
  if (isFeedback?.feedback_type === 1) {
    positiveFeedbackClassName = `${positiveFeedbackClassName} ${styles.isActive}`;
  }
  if (isFeedback?.feedback_type === 0) {
    negativeFeedbackClassName = `${negativeFeedbackClassName} ${styles.isActive}`;
  }

  const feedbackHandler = (
    e: MouseEvent<HTMLDivElement>,
    feedbackType: number | undefined
  ) => {
    e.preventDefault();
    if (isFeedback) return;
    if (typeof feedbackType === "undefined") return;

    if (!user_id) {
      dispatch(setVisibilitySignInModal(true));
      return;
    }
    dispatch(
      addFeedbackTrigger({
        feedbackType: feedbackType,
        userId: user_id,
        productId: product_id,
      })
    );
  };

  const containerClassName =
    searchParams.get("view") === "list"
      ? styles.listContainer
      : styles.pileContainer;

  const counters = [
    {
      value: views_amount,
      children: <Views />,
      className: styles.views,
      handler: undefined,
      feedbackType: undefined,
    },
    {
      value: favorites_amount,
      children: <FavoriteCount />,
      className: styles.favoriteCounter,
      handler: undefined,
      feedbackType: undefined,
    },
    {
      value: positive_feedbacks_amount,
      children: <Shape />,
      className: positiveFeedbackClassName,
      handler: feedbackHandler,
      feedbackType: 1,
    },
    {
      value: negative_feedbacks_amount,
      children: <NegativeShape />,
      className: negativeFeedbackClassName,
      handler: feedbackHandler,
      feedbackType: 0,
    },
  ];

  return (
    <div className={containerClassName} key={product_id}>
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
          {counters.map((item, index) => (
            <CountItem
              key={index}
              value={item.value}
              children={item.children}
              className={item.className}
              feedbackType={item.feedbackType}
              clickHandler={item.handler}
            />
          ))}
        </div>
      </NavLink>
      {users_roles?.role_title === "admin" && (
        <div className={styles.controlContainer}>
          <button className={styles.edit}>
            <span>
              <Link to={`/admin/update/${product_id}`}>Edit</Link>
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
