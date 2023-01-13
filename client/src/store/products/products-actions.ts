import { productsSlice } from "store/products/products-slice";

export const {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
  clearProductsList,
  removeProductFulfilled,
  removeProductRejected,
  removeProductTrigger,
  removeProductPending,
  updateProductAction,
  addNewProduct,
  setCurrentPage,
} = productsSlice.actions;
