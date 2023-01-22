import { RootState } from "store/store-types";

const selectProductControlStatus = (state: RootState) =>
  state.productControl.status;
const selectProductControlError = (state: RootState) =>
  state.productControl.error;
const selectProductControlSuccess = (state: RootState) =>
  state.productControl.success;

export {
  selectProductControlSuccess,
  selectProductControlError,
  selectProductControlStatus,
};
