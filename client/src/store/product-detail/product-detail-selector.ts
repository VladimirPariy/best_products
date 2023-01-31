import { RootState } from "lib/interfaces/store.types";

const selectProductDetail = (state: RootState) =>
  state.productDetail.productDetail;
const selectProductImages = (state: RootState) =>
  state.productDetail.productDetail.product_images;

export { selectProductDetail, selectProductImages };
