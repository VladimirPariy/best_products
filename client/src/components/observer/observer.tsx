import React, { FC, useRef } from "react";

import { useObserver } from "lib/hooks/use-observer";

import {
  selectCurrentProductPage,
  selectProductsStatus,
  selectTotalProductsPage,
} from "store/products/products-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { setCurrentPage } from "store/products/products-actions";

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
