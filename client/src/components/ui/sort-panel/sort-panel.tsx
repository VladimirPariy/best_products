import React, {
  FC,
  SetStateAction,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

import styles from "components/ui/sort-panel/sort-panel.module.scss";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

import Arrow from "assets/icon/general/arrow";
import Arrows from "assets/icon/sort/arrows";
import Filter from "assets/icon/sort/filter";
import View from "assets/icon/sort/view";
import View1 from "assets/icon/sort/view-1";

interface Props {
  setIsShowFilter: Dispatch<SetStateAction<boolean>>;
}

const SortPanel: FC<Props> = ({ setIsShowFilter }) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 1];
  let [searchParams, setSearchParams] = useSearchParams();
  const [viewStyle, setViewStyle] = useState<boolean>(
    searchParams.get("view") === "pile"
  );
  const [sortPrice, setSortPrice] = useState<boolean>(
    searchParams.get("orderBy") === "desc"
  );

  const changeView = () => {
    setViewStyle((prev) => !prev);
  };

  const changeSort = () => {
    setSortPrice((prev) => !prev);
  };

  useEffect(() => {
    if (viewStyle) {
      searchParams.set("view", "pile");
      setSearchParams(searchParams);
    } else {
      searchParams.set("view", "list");
      setSearchParams(searchParams);
    }
  }, [viewStyle, setSearchParams, searchParams]);

  useEffect(() => {
    if (sortPrice) {
      searchParams.set("orderBy", "desc");
      setSearchParams(searchParams);
    } else {
      searchParams.set("orderBy", "asc");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, sortPrice]);

  const sortStyle = getClassNameByCondition(
    styles,
    "arrow",
    "desc",
    sortPrice,
    "asc"
  );

  const showFilterPanelHandler = () => {
    setIsShowFilter((prev) => !prev);
  };
  return (
    <div className={styles.wrapper}>
      <div onClick={changeView} className={styles.view}>
        {viewStyle ? <View1 /> : <View />}
      </div>
      <div onClick={changeSort} className={styles.priceContainer}>
        <Arrows />
        <span className={styles.price}>Price</span>
        <span className={sortStyle}>
          <Arrow />
        </span>
      </div>
      <div onClick={showFilterPanelHandler} className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.category}>
        Category:
        <span className={styles.categoryTitle}>{category}</span>
      </div>
    </div>
  );
};

export default SortPanel;
