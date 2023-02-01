import {Loader} from "components/ui/loader/loader";
import React, {FC, useEffect, useState} from "react";

import {
  clearProductsList,
  productsListTrigger,
} from "store/products/products-actions";
import {
  selectCurrentProductPage,
  selectMaxPrice,
  selectMinPrice,
  selectProductList,
  selectProductsOrderBy,
  selectProductsStatus,
} from "store/products/products-selectors";
import {useAppDispatch, useAppSelector} from "lib/interfaces/store.types";

import ProductItem from "components/ui/product-item/product-item";
import ProductListWrapper from "components/ui/product-list-wrapper/product-list-wrapper";

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

  const [selectedParams, setSelectedParams] = useState(selectedParameters);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    if (isLoading) return;
    if (
      order !== orderFromServer ||
      !order ||
      (subcategoryId && subcategoryId !== `${subcategoryFromServer}`) ||
      (minPrice && +minPrice !== minPriceFromServer) ||
      (maxPrice && +maxPrice !== maxPriceFromServer) ||
      selectedParameters !== selectedParams
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
      setSelectedParams(selectedParameters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, category, subcategoryId, minPrice, maxPrice, selectedParameters]);
  return (
    <>
      {products.length > 0 && (
        <ProductListWrapper>
          {products.map((product) => (
            <ProductItem {...product} key={product.product_id}/>
          ))}
        </ProductListWrapper>
      )}
      {isLoading ? <Loader color={"#766ed3"}/> : null}
    </>
  );
};

export default ProductsList;
