import { RootState } from "store/store-types";

const selectProductDetail = (state: RootState) =>
  state.productDetail.productDetail;
const selectProductDetailError = (state: RootState) =>
  state.productDetail.error;
const selectProductDetailsIsFetch = (state: RootState) =>
  state.productDetail.isFetch;
const selectProductImages = (state: RootState) =>
  state.productDetail.productDetail.product_images;

export {
  selectProductDetail,
  selectProductDetailError,
  selectProductDetailsIsFetch,
  selectProductImages,
};
