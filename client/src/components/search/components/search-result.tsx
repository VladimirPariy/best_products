import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "components/search/components/search-result.module.scss";
import {
  setVisibilitySearchModal,
  setVisibilityBurgerMenu,
} from "store/modals/modals-actions";

import { selectSearchModal } from "store/modals/modals-selectors";
import { selectCategories } from "store/categories/categories-selectors";
import {
  selectSearchProductResult,
  selectSearchStatus,
  selectSearchSubcategoriesResult,
} from "store/search/search-selector";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import { apiUrls } from "lib/enums/api-urls";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResult: FC<Props> = ({ setSearch }) => {
  const dispatch = useAppDispatch();
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);
  const productResult = useAppSelector(selectSearchProductResult);
  const subcategoryResult = useAppSelector(selectSearchSubcategoriesResult);
  const isFetch = useAppSelector(selectSearchStatus);

  const categories = useAppSelector(selectCategories);

  if (!isVisibilitySearchModal) {
    return null;
  }
  const linkClickHandler = () => {
    dispatch(setVisibilitySearchModal(false));
    dispatch(setVisibilityBurgerMenu(false));
    setSearch("");
  };

  const loadingCondition = isVisibilitySearchModal && isFetch && (
    <div>Loading</div>
  );
  const emptySearch = isVisibilitySearchModal &&
    !isFetch &&
    subcategoryResult.length === 0 &&
    productResult.length === 0 && (
      <div className={styles.emptySearch}>Enter a query</div>
    );

  const separator = productResult?.length > 0 &&
    subcategoryResult?.length > 0 && <div className={styles.separator}></div>;
  return (
    <>
      <div className={styles.searchResultContainer}>
        <div className={styles.modal}>
          {emptySearch}
          {loadingCondition}
          {subcategoryResult?.length > 0 && (
            <div className={styles.subcategoryContainer}>
              {subcategoryResult.map((item, index) => {
                if (index >= 3) return null;
                return (
                  <NavLink
                    onClick={linkClickHandler}
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
          {separator}
          {productResult?.length > 0 && (
            <div className={styles.productContainer}>
              <div className={styles.title}>Goods</div>
              {productResult.map((item, index) => {
                if (index >= 3) return null;
                return (
                  <NavLink
                    to={`/product/${item.product_id}`}
                    key={item.product_id}
                    onClick={linkClickHandler}
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
