import { RootState } from "lib/interfaces/store.types";

const selectProductList = (state: RootState) => state.products.productsList;
const selectProductsStatus = (state: RootState) => state.products.isFetch;
const selectCurrentProductPage = (state: RootState) =>
  state.products.currentPage;
const selectTotalProductsPage = (state: RootState) => state.products.totalPage;
const selectProductsOrderBy = (state: RootState) => state.products.orderBy;

const selectMinPrice = (state: RootState) => state.products.minPrice;
const selectMaxPrice = (state: RootState) => state.products.maxPrice;

export {
  selectProductList,
  selectProductsStatus,
  selectCurrentProductPage,
  selectTotalProductsPage,
  selectProductsOrderBy,
  selectMinPrice,
  selectMaxPrice,
};
