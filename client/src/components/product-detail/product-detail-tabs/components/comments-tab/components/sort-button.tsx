import React, { Dispatch, FC, SetStateAction } from "react";

import styles from "components/product-detail/product-detail-tabs/components/comments-tab/components/sort-button.module.scss";
import Arrow from "assets/icon/general/arrow";
import Arrows from "assets/icon/sort/arrows";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  sort: boolean;
  setSort: Dispatch<SetStateAction<boolean>>;
}

const SortButton: FC<Props> = ({ setSort, sort }) => {
  const arrowClassName = getClassNameByCondition(
    styles,
    "toggleSort",
    "descSort",
    !sort,
    ""
  );
  const sortHandler = () => {
    setSort((prev) => !prev);
  };
  return (
    <button onClick={sortHandler} className={styles.commentsSort}>
      <span className={styles.arrowsSort}>
        <Arrows />
      </span>
      <span className={styles.sortTitle}>Date</span>
      <span className={arrowClassName}>
        <Arrow />
      </span>
    </button>
  );
};

export default SortButton;
