import { productControlSlice } from "store/product-control/product-control-slice";

export const {
  createProductTrigger,
  createProductFulfilled,
  clearProductControl,
  removeProductTrigger,
  removeProductFulfilled,
  productControlRejected,
  updateProductFulfilled,
  updateProductTrigger,
  productControlPending,
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  removeProductImageTrigger,
  removeProductImageFulfilled,
} = productControlSlice.actions;
