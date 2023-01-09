import {Observer} from "components/observer/observer";
import ProductsList from "components/products-list/products-list";
import {selectCategories} from "lib/store/categories/categories-selectors";
import {useAppSelector} from "lib/store/store-types";
import React, {FC} from "react";
import {useLocation} from "react-router";
import {useSearchParams} from "react-router-dom";

const SubcategoryPage: FC = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 2];

  const subcategory = pathArray[pathArray.length - 1];
  const categoryFromServer = useAppSelector(selectCategories).find(item => item.category_title === category)
  const subcategoryId = categoryFromServer?.subcategories.find(item => item.subcategory_title === subcategory)?.subcategory_id

  let [searchParams] = useSearchParams();
  const order = searchParams.get("orderBy");
  const selectedParameters = searchParams.get('selectedParameters')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  return (
    <>
      <ProductsList category={category}
                    subcategoryId={subcategoryId ? `${subcategoryId}` : null}
                    order={order}
                    selectedParameters={selectedParameters}
                    minPrice={minPrice}
                    maxPrice={maxPrice}/>
      <Observer/>
    </>
  );
};

export default SubcategoryPage;
