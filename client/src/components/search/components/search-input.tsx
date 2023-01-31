import React, { FC, MouseEvent, ReactNode, useEffect, useState } from "react";

import styles from "components/search/components/search-input.module.scss";
import SearchIcon from "assets/icon/header/search-icon";

import { useDebounce } from "lib/hooks/use-debounce";
import { setVisibilitySearchModal } from "store/modals/modals-actions";
import { selectSearchModal } from "store/modals/modals-selectors";
import { clearSearchState, searchTrigger } from "store/search/search-action";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";

interface ISearchInputProps {
  children: ReactNode;
}

const SearchInput: FC<ISearchInputProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);

  const [search, setSearch] = useState("");

  const debouncedSearchTerm: string = useDebounce<string>(search, 1000);

  useEffect(() => {
    debouncedSearchTerm
      ? dispatch(searchTrigger(debouncedSearchTerm))
      : dispatch(clearSearchState());
    return () => {
      dispatch(clearSearchState());
    };
  }, [dispatch, debouncedSearchTerm]);

  const visibleModalHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isVisibilitySearchModal) {
      dispatch(setVisibilitySearchModal(true));
    }
  };

  return (
    <div className={styles.searchInputContainer} onClick={visibleModalHandler}>
      <button className={styles.searchButton} type="submit">
        <SearchIcon />
      </button>
      <div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {children}
      </div>
    </div>
  );
};

export default SearchInput;
