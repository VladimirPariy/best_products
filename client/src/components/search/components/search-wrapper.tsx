import { setVisibilitySearchModal } from "store/modals/modals-actions";
import { selectSearchModal } from "store/modals/modals-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";
import React, { FC, ReactNode } from "react";

import styles from "components/search/components/search-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const SearchWrapper: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);

  return (
    <div
      className={styles.searchContainer}
      onClick={() => dispatch(setVisibilitySearchModal(false))}
    >
      {isVisibilitySearchModal && (
        <div className={styles.searchBackground}></div>
      )}
      {children}
    </div>
  );
};

export default SearchWrapper;
