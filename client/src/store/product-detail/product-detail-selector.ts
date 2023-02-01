import { RootState } from "lib/interfaces/store.types";

const selectProductDetail = (state: RootState) =>
  state.productDetail.productDetail;
const selectProductDetailStatus = (state: RootState) =>
  state.productDetail.isFetch;
const selectProductImages = (state: RootState) =>
  state.productDetail.productDetail.product_images;

export { selectProductDetail, selectProductImages, selectProductDetailStatus };
