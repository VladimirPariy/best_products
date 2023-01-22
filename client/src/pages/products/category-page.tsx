import React, { FC } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

import { Observer } from "components/observer/observer";
import ProductsList from "components/products-list/products-list";

const CategoryPage: FC = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 1];

  let [searchParams] = useSearchParams();
  const subcategoryId = searchParams.get("subcategoryId");
  const order = searchParams.get("orderBy");
  const selectedParameters = searchParams.get("selectedParameters");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  return (
    <>
      <ProductsList
        category={category}
        selectedParameters={selectedParameters}
        order={order}
        maxPrice={maxPrice}
        minPrice={minPrice}
        subcategoryId={subcategoryId}
      />
      <Observer />
    </>
  );
};

export default CategoryPage;
