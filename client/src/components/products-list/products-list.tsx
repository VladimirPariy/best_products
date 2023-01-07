import ProductItem from "components/product-item/product-item";
import {
  clearProductsList,
  productsListTrigger,
} from "lib/store/products/products-actions";
import {
  selectCurrentProductPage,
  selectProductList,
  selectProductsOrderBy,
  selectProductsStatus,
  selectTotalProductsPage,
} from "lib/store/products/products-selectors";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styles from "components/products-list/products-list.module.scss";
import { useSearchParams } from "react-router-dom";

interface Props {}

const ProductsList: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 1];
  const isLoading = useAppSelector(selectProductsStatus);
  const products = useAppSelector(selectProductList);
  const currentPage = useAppSelector(selectCurrentProductPage);
  const orderFromServer = useAppSelector(selectProductsOrderBy);
  let [searchParams] = useSearchParams();

  const productsLimit = 10;
  const order = searchParams.get("orderBy");

  useEffect(() => {
    if (isLoading) return;
    if (
      (products.length === 0 ||
        products.length !== currentPage * productsLimit) &&
      order === orderFromServer
    ) {
      dispatch(
        productsListTrigger({
          category: category,
          page: currentPage,
          orderBy: order || "asc",
        })
      );
    }
  }, [currentPage]);
  useEffect(() => {
    if (isLoading) return;
    if (order !== orderFromServer || !order) {
      dispatch(clearProductsList());
      dispatch(
        productsListTrigger({
          category: category,
          page: 1,
          orderBy: order || orderFromServer || "asc",
        })
      );
    }
  }, [order]);
  return (
    <>
      {products.length > 0 && (
        <div className={styles.listContainer}>
          {products.map((product) => (
            <ProductItem {...product} key={product.product_id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
