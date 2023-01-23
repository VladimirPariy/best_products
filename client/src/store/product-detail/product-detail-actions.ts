import { productDetailSlice } from "store/product-detail/product-detail-slice";

export const {
  getProductDetailTrigger,
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  clearProductDetail,
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  uploadProductImagePending,
  uploadProductImageRejected,
  removeProductImageTrigger,
  removeProductImageFulfilled,
  removeProductImageRejected,
  removeProductImagePending,
  incrementCommentsAmount,
  decrementCommentsAmount,
} = productDetailSlice.actions;
