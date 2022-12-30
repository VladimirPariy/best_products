import SubcategoryLink from "components/ui/subcategory-link/subcategory-link";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesIsFetching,
  selectSubcategories,
} from "lib/store/categories/categories-selectors";
import { useAppSelector } from "lib/store/store-types";
import React, { FC } from "react";
import styles from "pages/home/home.module.scss";
import banner from "assets/images/banner.png";

const Home: FC = () => {
  const categories = useAppSelector(selectCategories);
  const subcategories = useAppSelector(selectSubcategories);
  const isLoading = useAppSelector(selectCategoriesIsFetching);
  const error = useAppSelector(selectCategoriesError);

  return (
    <div className={styles.mainPage}>
      {subcategories && categories && (
        <>
          <img src={banner} alt="" />
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
    </div>
  );
};

export default Home;
