import {RootState} from "store/store-types";

const selectPriceHistory = (state: RootState) => state.priceHistory.entities;
const selectPriceHistoryStatus = (state: RootState) => state.priceHistory.status;
const selectPriceHistoryError = (state: RootState) => state.priceHistory.error;

export {selectPriceHistory, selectPriceHistoryStatus, selectPriceHistoryError}