import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/search/components/search-result.module.scss";
import { setVisibilitySearchModal } from "store/modals/modals-actions";

import { selectSearchModal } from "store/modals/modals-selectors";
import { selectCategories } from "store/categories/categories-selectors";
import {
  selectSearchProductResult,
  selectSearchStatus,
  selectSearchSubcategoriesResult,
} from "store/search/search-selector";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { apiUrls } from "lib/enums/api-urls";

const SearchResult: FC = () => {
  const dispatch = useAppDispatch();
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);
  const productResult = useAppSelector(selectSearchProductResult);
  const subcategoryResult = useAppSelector(selectSearchSubcategoriesResult);
  const isFetch = useAppSelector(selectSearchStatus);

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
                    onClick={() => dispatch(setVisibilitySearchModal(false))}
                    to={`product/${
                      categories.find(
                        (category) => category.category_id === item.category
                      )?.category_title
                    }/${item.subcategory_title}`}
                    key={item.subcategory_id}
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
                  <NavLink
                    to={`/product/${item.product_id}`}
                    key={item.product_id}
                    onClick={() => dispatch(setVisibilitySearchModal(false))}
                  >
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
