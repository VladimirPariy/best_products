import {productsSlice} from "lib/store/products/products-slice";

export const {
  productsListFulfilled,
  productsListPending,
  productsListRejected,
  productsListTrigger,
  clearProductsList,
  removeProductFulfilled,
  removeProductRejected,
  removeProductTrigger,
  removeProductPending
} = productsSlice.actions