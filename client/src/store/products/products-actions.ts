import { productsSlice } from "store/products/products-slice";

export const {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
  clearProductsList,
  updateProductAction,
  setCurrentPage,
  incrementViewCounter,
  incrementFavoriteCounter,
  decrementFavoriteCounter,
  removeProductFromProductList,
  incrementPositiveFeedbackCounter,
  incrementNegativeFeedbackCounter,
} = productsSlice.actions;
