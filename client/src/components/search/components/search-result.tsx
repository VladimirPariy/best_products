import { selectCategories } from "store/categories/categories-selectors";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/search/components/search-result.module.scss";

import { selectSearchModal } from "store/modals/modals-selectors";
import {
  selectSearchError,
  selectSearchProductResult,
  selectSearchStatus,
  selectSearchSubcategoriesResult,
} from "store/search/search-selector";
import { useAppSelector } from "store/store-types";
import { apiUrls } from "lib/enums/api-urls";

const SearchResult: FC = () => {
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);
  const productResult = useAppSelector(selectSearchProductResult);
  const subcategoryResult = useAppSelector(selectSearchSubcategoriesResult);
  const isFetch = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectSearchError);

  const categories = useAppSelector(selectCategories);

  if (!isVisibilitySearchModal) {
    return null;
  }

  return (
    <>
      <div className={styles.searchResultContainer}>
        <div className={styles.modal}>
          {isVisibilitySearchModal &&
            !isFetch &&
            subcategoryResult.length === 0 &&
            productResult.length === 0 && (
              <div className={styles.emptySearch}>Enter a query</div>
            )}
          {isVisibilitySearchModal && isFetch && <div>Loading</div>}
          {subcategoryResult?.length > 0 && (
            <div className={styles.subcategoryContainer}>
              {subcategoryResult.map((item, index) => {
                if (index >= 3) return null;
                return (
                  <NavLink
                    to={`product/${
                      categories.find(
                        (category) => category.category_id === item.category
                      )?.category_title
                    }/${item.subcategory_title}`}
                  >
                    <div>{item.subcategory_title}</div>
                  </NavLink>
                );
              })}
            </div>
          )}
          {productResult?.length > 0 && subcategoryResult?.length > 0 && (
            <div className={styles.separator}></div>
          )}
          {productResult?.length > 0 && (
            <div className={styles.productContainer}>
              <div className={styles.title}>Goods</div>
              {productResult.map((item, index) => {
                if (index >= 3) return null;
                return (
                  <NavLink to={"/"}>
                    <img
                      src={`${apiUrls.BASE_Image_URL}${item.product_images[0].image_title}`}
                      alt="product"
                    />
                    <div>{item.product_title}</div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
