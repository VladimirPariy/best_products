import { RootState } from "lib/store/store-types";

const selectProductList = (state: RootState) => state.products.productsList;
const selectProductsError = (state: RootState) => state.products.error;
const selectProductsStatus = (state: RootState) => state.products.isFetch;
const selectCurrentProductPage = (state:RootState) => state.products.currentPage;
const selectTotalProductsPage = (state:RootState) => state.products.totalPage;
const selectProductsOrderBy = (state:RootState) => state.products.orderBy;

export { selectProductList, selectProductsError, selectProductsStatus, selectCurrentProductPage,selectTotalProductsPage,selectProductsOrderBy };
