import React, { FC, useState } from "react";
import { Outlet } from "react-router";

import styles from "pages/products/layout-page/layout-page.module.scss";

import Breadcrumbs from "components/ui/breadcrumbs/breadcrumbs";
import FilterPanel from "components/ui/filter-panel/filter-panel";
import SortPanel from "components/ui/sort-panel/sort-panel";

const LayoutPage: FC = () => {
  const [isShowFilter, setIsShowFilter] = useState(true);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs />
      <SortPanel setIsShowFilter={setIsShowFilter} />
      <FilterPanel isShowFilter={isShowFilter} />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
