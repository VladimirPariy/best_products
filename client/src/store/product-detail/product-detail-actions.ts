import { productDetailSlice } from "store/product-detail/product-detail-slice";

export const {
  getProductDetailTrigger,
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  clearProductDetail,
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  removeProductImageTrigger,
  removeProductImageFulfilled,
  changeProductImageRejected,
  changeProductImagePending,
  incrementCommentsAmount,
  decrementCommentsAmount,
} = productDetailSlice.actions;
