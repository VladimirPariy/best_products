import React, { FC, useEffect } from "react";

import styles from "components/products-list/products-list.module.scss";

import ProductItem from "components/product-item/product-item";
import {
  clearProductsList,
  productsListTrigger,
} from "lib/store/products/products-actions";
import {
  selectCurrentProductPage,
  selectMaxPrice,
  selectMinPrice,
  selectProductList,
  selectProductsOrderBy,
  selectProductsStatus,
} from "lib/store/products/products-selectors";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";

interface Props {
  category: string;
  subcategoryId: string | null;
  order: string | null;
  selectedParameters: string | null;
  minPrice: string | null;
  maxPrice: string | null;
}

const ProductsList: FC<Props> = (props) => {
  const {
    selectedParameters,
    minPrice,
    maxPrice,
    category,
    subcategoryId,
    order,
  } = props;

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectProductsStatus);
  const products = useAppSelector(selectProductList);
  const currentPage = useAppSelector(selectCurrentProductPage);
  const orderFromServer = useAppSelector(selectProductsOrderBy);
  const minPriceFromServer = useAppSelector(selectMinPrice);
  const maxPriceFromServer = useAppSelector(selectMaxPrice);
  const subcategoryFromServer = products[0]?.subcategories[0]?.subcategory_id;

  const productsLimit = 10;

  useEffect(() => {
    if (isLoading) return;
    if (
      (products.length === 0 ||
        (products.length !== currentPage * productsLimit &&
          products.length >= productsLimit)) &&
      (order ?? "asc") === orderFromServer
    ) {
      dispatch(
        productsListTrigger({
          category: category,
          page: currentPage,
          orderBy: order || "asc",
          filter: {
            subcategoryId,
            selectedParameters,
            minPrice,
            maxPrice,
          },
        })
      );
    }
  }, [currentPage]);
  useEffect(() => {
    if (isLoading) return;
    if (
      order !== orderFromServer ||
      !order ||
      (subcategoryId && subcategoryId !== `${subcategoryFromServer}`) ||
      (minPrice && +minPrice !== minPriceFromServer) ||
      (maxPrice && +maxPrice !== maxPriceFromServer)
    ) {
      dispatch(clearProductsList());
      dispatch(
        productsListTrigger({
          category: category,
          page: 1,
          orderBy: order || orderFromServer || "asc",
          filter: {
            subcategoryId,
            selectedParameters,
            minPrice,
            maxPrice,
          },
        })
      );
    }
  }, [order, category, subcategoryId, minPrice, maxPrice, selectedParameters]);

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
