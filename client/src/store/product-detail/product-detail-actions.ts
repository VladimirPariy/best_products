import { productDetailSlice } from "store/product-detail/product-detail-slice";

export const {
  getProductDetailTrigger,
  getProductDetailFulfilled,
  getProductDetailPending,
  getProductDetailRejected,
  clearProductDetail,
  incrementCommentsAmount,
  decrementCommentsAmount,
  removeImage,
  addImage,
} = productDetailSlice.actions;
