import React, {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";

import styles from "components/products-list/products-list.module.scss";

import ProductItem from "components/product-item/product-item";
import {
  clearProductsList,
  productsListTrigger,
} from "lib/store/products/products-actions";
import {
  selectCurrentProductPage, selectMaxPrice, selectMinPrice,
  selectProductList,
  selectProductsOrderBy,
  selectProductsStatus,
} from "lib/store/products/products-selectors";
import {useAppDispatch, useAppSelector} from "lib/store/store-types";

interface Props {
}

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
  const minPriceFromServer = useAppSelector(selectMinPrice);
  const maxPriceFromServer = useAppSelector(selectMaxPrice);

  const productsLimit = 10;
  const order = searchParams.get("orderBy");


  const subcategoryId = searchParams.get('subcategoryId')
  const selectedParameters = searchParams.get('selectedParameters')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  useEffect(() => {
    if (isLoading) return;
    if (
      (products.length === 0 ||
        (products.length !== currentPage * productsLimit &&
          products.length >= productsLimit)) &&
      (order ?? 'asc') === orderFromServer
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
          }
        })
      );
    }
  }, [currentPage]);
  useEffect(() => {
    if (isLoading) return;
    if (order !== orderFromServer || !order || subcategoryId || (minPrice && +minPrice !== minPriceFromServer) || (maxPrice && +maxPrice !== maxPriceFromServer)) {
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
          }
        })
      );
    }
  }, [order, category, subcategoryId, minPrice, maxPrice, selectedParameters]);


  return (
    <>
      {products.length > 0 && (
        <div className={styles.listContainer}>
          {products.map((product) => (
            <ProductItem {...product} key={product.product_id}/>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
