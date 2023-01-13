import { productDetailSlice } from "store/product-detail/product-detail-slice";

export const {
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  getProductDetailTrigger,
  clearProductDetail,
  uploadProductImageTrigger,
  uploadProductImageFulfilled,
  uploadProductImagePending,
  uploadProductImageRejected,
  removeProductImageTrigger,
  removeProductImageFulfilled,
  removeProductImageRejected,
  removeProductImagePending,
} = productDetailSlice.actions;
