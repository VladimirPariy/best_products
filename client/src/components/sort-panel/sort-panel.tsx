import React, {
  FC,
  SetStateAction,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

import styles from "components/sort-panel/sort-panel.module.scss";

import CategoryScoreboard from "components/sort-panel/components/category-scoreboard";
import PriceSort from "components/sort-panel/components/price-sort";
import ToggleFilter from "components/sort-panel/components/toggle-filter";
import ViewSort from "components/sort-panel/components/view-sort";

interface Props {
  setIsShowFilter: Dispatch<SetStateAction<boolean>>;
}

const SortPanel: FC<Props> = ({ setIsShowFilter }) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const category = pathArray[pathArray.length - 1];
  let [searchParams, setSearchParams] = useSearchParams();
  const [viewStyle, setViewStyle] = useState<boolean>(
    searchParams.get("view") === "list"
  );
  const [sortPrice, setSortPrice] = useState<boolean>(
    searchParams.get("orderBy") === "desc"
  );

  useEffect(() => {
    if (viewStyle) {
      searchParams.set("view", "list");
      setSearchParams(searchParams);
    } else {
      searchParams.set("view", "pile");
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewStyle]);

  useEffect(() => {
    if (sortPrice) {
      searchParams.set("orderBy", "desc");
      setSearchParams(searchParams);
    } else {
      searchParams.set("orderBy", "asc");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, sortPrice]);

  return (
    <div className={styles.wrapper}>
      <ViewSort
        viewStyle={viewStyle}
        changeView={() => setViewStyle((prev) => !prev)}
      />
      <PriceSort
        changeSort={() => setSortPrice((prev) => !prev)}
        sortPrice={sortPrice}
      />
      <ToggleFilter toggle={() => setIsShowFilter((prev) => !prev)} />
      <CategoryScoreboard category={category} />
    </div>
  );
};

export default SortPanel;
