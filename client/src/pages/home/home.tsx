import React, { FC } from "react";

import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesIsFetching,
  selectSubcategories,
} from "store/categories/categories-selectors";
import { useAppSelector } from "store/store-types";

import Banner from "pages/home/components/banner";
import MainPageWrapper from "pages/home/components/main-page-wrapper";
import SubcategoryLink from "pages/home/components/subcategory-link";

const Home: FC = () => {
  const categories = useAppSelector(selectCategories);
  const subcategories = useAppSelector(selectSubcategories);
  const isLoading = useAppSelector(selectCategoriesIsFetching);
  const error = useAppSelector(selectCategoriesError);

  return (
    <MainPageWrapper>
      {subcategories && categories && (
        <>
          <Banner />
          {subcategories.map((subcategory) => (
            <SubcategoryLink
              subcategory={subcategory}
              categories={categories}
              key={subcategory.subcategory_id}
            />
          ))}
        </>
      )}
      {error && <div>Error</div>}
      {isLoading && <div>Loading...</div>}
    </MainPageWrapper>
  );
};

export default Home;
