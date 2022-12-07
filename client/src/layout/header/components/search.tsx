import SearchIcon from "assets/icon/header/search-icon";
import React, {FC} from "react";
import styles from "layout/header/components/search.module.scss";


interface Props {
}

const Search: FC<Props> = (props) => {
  return (
    <div className={styles.searchContainer}>
      <button type="submit" className={styles.searchButton}>
        <SearchIcon/>
      </button>
      <input type="text" className={styles.searchInput} placeholder='Search'/>
    </div>
  );
};

export default Search;