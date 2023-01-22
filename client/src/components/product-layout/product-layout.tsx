import React, { FC, useState } from "react";
import { Outlet } from "react-router";

import Breadcrumbs from "components/breadcrumbs/breadcrumbs";
import ProductLayoutWrapper from "components/product-layout/components/product-layout-wrapper";
import FilterPanel from "components/filter-panel/filter-panel";
import SortPanel from "components/sort-panel/sort-panel";

interface Props {
  isShowBreadcrumbs: boolean;
}

const ProductLayout: FC<Props> = ({ isShowBreadcrumbs }) => {
  const [isShowFilter, setIsShowFilter] = useState(false);

  return (
    <ProductLayoutWrapper>
      {isShowBreadcrumbs && <Breadcrumbs />}
      <SortPanel setIsShowFilter={setIsShowFilter} />
      <FilterPanel isShowFilter={isShowFilter} />
      <Outlet />
    </ProductLayoutWrapper>
  );
};

export default ProductLayout;
