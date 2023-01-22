import { productControlSlice } from "store/product-control/product-control-slice";

export const {
  createProductTrigger,
  createProductFulfilled,
  createProductPending,
  createProductRejected,
  clearProductControl,
} = productControlSlice.actions;
