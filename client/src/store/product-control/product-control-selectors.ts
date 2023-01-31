import { RootState } from "lib/interfaces/store.types";

const selectProductControlStatus = (state: RootState) =>
  state.productControl.status;

const selectProductControlSuccess = (state: RootState) =>
  state.productControl.success;

export { selectProductControlSuccess, selectProductControlStatus };
