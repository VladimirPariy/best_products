import React, { FC, useState } from "react";
import { Outlet } from "react-router";

import Breadcrumbs from "components/breadcrumbs/breadcrumbs";
import PageLayoutWrapper from "pages/products/layout-page/components/page-layout-wrapper";
import FilterPanel from "components/filter-panel/filter-panel";
import SortPanel from "components/sort-panel/sort-panel";

const LayoutPage: FC = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);

  return (
    <PageLayoutWrapper>
      <Breadcrumbs />
      <SortPanel setIsShowFilter={setIsShowFilter} />
      <FilterPanel isShowFilter={isShowFilter} />
      <Outlet />
    </PageLayoutWrapper>
  );
};

export default LayoutPage;
