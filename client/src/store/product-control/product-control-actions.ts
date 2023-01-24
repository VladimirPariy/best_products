import { productControlSlice } from "store/product-control/product-control-slice";

export const {
  createProductTrigger,
  createProductFulfilled,
  createProductPending,
  createProductRejected,
  clearProductControl,
  removeProductTrigger,
  removeProductPending,
  removeProductFulfilled,
  removeProductRejected,
} = productControlSlice.actions;
