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
  setCurrentPage,
  incrementViewCounter,
  incrementPositiveFeedbackCounter,
  incrementNegativeFeedbackCounter,
  incrementFavoriteCounter,
  decrementFavoriteCounter,
} = productsSlice.actions;
