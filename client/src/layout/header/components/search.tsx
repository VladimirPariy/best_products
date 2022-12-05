import React, {FC} from "react";
import styles from "layout/header/header.module.scss";

interface Props {
}

const Search: FC<Props> = (props) => {
  return (
    <div className={styles.searchContainer}>
      <input type="submit" className={styles.searchButton}/>
      <input type="text" className={styles.searchInput}/>
    </div>
  );
};

export default Search;