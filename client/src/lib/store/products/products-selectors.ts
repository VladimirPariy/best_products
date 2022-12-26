import { RootState } from "lib/store/store-types";

const selectProductList = (state: RootState) => state.products.productsList;
const selectProductsError = (state: RootState) => state.products.error;
const selectProductsStatus = (state: RootState) => state.products.isFetch;

export { selectProductList, selectProductsError, selectProductsStatus };
