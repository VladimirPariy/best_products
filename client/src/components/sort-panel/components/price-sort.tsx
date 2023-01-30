import React, { FC } from "react";

import styles from "components/sort-panel/components/price-sort.module.scss";
import Arrow from "assets/icon/general/arrow";
import Arrows from "assets/icon/sort/arrows";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  changeSort: () => void;
  sortPrice: boolean;
}

const PriceSort: FC<Props> = ({ changeSort, sortPrice }) => {
  const sortStyle = getClassNameByCondition(
    styles,
    "arrow",
    "desc",
    sortPrice,
    "asc"
  );

  const buttonStyle = getClassNameByCondition(
    styles,
    "priceContainer",
    "",
    sortPrice,
    "ascPriceContainer"
  );
  return (
    <div onClick={changeSort} className={buttonStyle}>
      <Arrows />
      <span className={styles.price}>Price</span>
      <span className={sortStyle}>
        <Arrow />
      </span>
    </div>
  );
};

export default PriceSort;
