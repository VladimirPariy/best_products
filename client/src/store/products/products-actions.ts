import { productsSlice } from "store/products/products-slice";

export const {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
  clearProductsList,
  setCurrentPage,
  incrementViewCounter,
  incrementFavoriteCounter,
  decrementFavoriteCounter,
  removeProductFromProductList,
  incrementPositiveFeedbackCounter,
  incrementNegativeFeedbackCounter,
  updateProductInProductList,
} = productsSlice.actions;
