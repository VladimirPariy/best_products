import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "pages/product-control/product-control.module.scss";

import ContentContainer from "components/ui/content-container/content-container";
import Title from "components/ui/title/title";
import { apiUrls } from "lib/enums/api-urls";
import { appUrl } from "lib/enums/app-urls";
import { useNavigateHome } from "lib/hooks/useNavigateHome";
import {
  productsListTrigger,
  removeProductTrigger,
} from "lib/store/products/products-actions";
import { selectProductList } from "lib/store/products/products-selectors";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";

import Price from "assets/icon/goods-statistics/price";
import defaultImageForProduct from "assets/images/goods/grey_square.jpg";

const ProductControl: FC = () => {
  const dispatch = useAppDispatch();
  useNavigateHome();
  const productsList = useAppSelector(selectProductList);

  useEffect(() => {
    if (!productsList.length) dispatch(productsListTrigger());
  }, [dispatch]);

  const removeProduct = (id: number) => {
    dispatch(removeProductTrigger(id));
  };

  return (
    <div className={styles.wrapper}>
      <ContentContainer>
        <Title>Products control</Title>
        <Link to={appUrl.new_product}>Add new product</Link>
      </ContentContainer>
      {productsList
        .map((product) => (
          <div key={product.product_id} className={styles.productContainer}>
            <img
              src={
                product.product_images[0]
                  ? apiUrls.BASE_Image_URL +
                    product.product_images[0].image_title
                  : defaultImageForProduct
              }
              alt="product"
              className={styles.image}
            />
            <div className={styles.productMain}>
              <div className={styles.productTitle}>{product.product_title}</div>
              <div className={styles.productPrice}>
                <Price />${product.price}
              </div>
            </div>
            <div className={styles.btnWrapper}>
              <Link
                to={`${appUrl.update_product.slice(
                  0,
                  appUrl.update_product.length - 3
                )}${product.product_id}`}
              >
                <button className={styles.editBtn}>Edit</button>
              </Link>
              <button
                className={styles.deleteBtn}
                onClick={() => removeProduct(product.product_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default ProductControl;
