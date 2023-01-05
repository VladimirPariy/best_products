import {selectCurrentProductPage, selectProductsStatus, selectTotalProductsPage} from "lib/store/products/products-selectors";
import React, { FC, useRef } from "react";

import { useObserver } from "lib/hooks/use-observer";


import { useAppDispatch, useAppSelector } from "lib/store/store-types";
import { setCurrentPage } from "lib/store/products/products-actions";

const Observer: FC = () => {
  const dispatch = useAppDispatch();
  const lastElemRef = useRef<HTMLDivElement>(null);

  const isLoading = useAppSelector(selectProductsStatus);
  const totalPages = useAppSelector(selectTotalProductsPage);
  const currentPage = useAppSelector(selectCurrentProductPage);

  useObserver(lastElemRef, currentPage < totalPages, isLoading, () =>
    dispatch(setCurrentPage())
  );

  return <div ref={lastElemRef} style={{ height: "20px" }} />;
};

export { Observer };
