import React, {FC} from "react";

import {Observer} from "components/observer/observer";
import ProductsList from "components/products-list/products-list";


const CategoryPage: FC = () => {


  return (
    <>
      <ProductsList/>
      <Observer/>
    </>
  )
};

export default CategoryPage;
