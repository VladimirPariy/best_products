import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
} from "react";

import styles from "components/search/components/search-input.module.scss";
import SearchIcon from "assets/icon/header/search-icon";

import { useDebounce } from "lib/hooks/use-debounce";
import { setVisibilitySearchModal } from "store/modals/modals-actions";
import { selectSearchModal } from "store/modals/modals-selectors";
import { clearSearchState, searchTrigger } from "store/search/search-action";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";

interface ISearchInputProps {
  children: ReactNode;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: FC<ISearchInputProps> = ({
  children,
  setSearch,
  search,
}) => {
  const dispatch = useAppDispatch();
  const isVisibilitySearchModal = useAppSelector(selectSearchModal);

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

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
          onChange={searchHandler}
        />
        {children}
      </div>
    </div>
  );
};

export default SearchInput;
