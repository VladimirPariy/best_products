import React, { FC, useEffect, useState } from "react";

import styles from "components/search/search.module.scss";
import SearchIcon from "assets/icon/header/search-icon";

import { useDebounce } from "lib/hooks/use-debounce";
import { useAppDispatch } from "lib/store/store-types";
import {
  clearSearchState,
  searchTrigger,
} from "lib/store/search/search-action";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const debouncedSearchTerm: string = useDebounce<string>(search, 1000);
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchTrigger(debouncedSearchTerm));
    } else {
      dispatch(clearSearchState());
    }
    return () => {
      dispatch(clearSearchState());
    };
  }, [dispatch, debouncedSearchTerm]);

  return (
    <div className={styles.searchContainer}>
      <button type="submit" className={styles.searchButton}>
        <SearchIcon />
      </button>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
