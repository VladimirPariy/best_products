import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IShotPriceHistory} from "lib/interfaces/price-history/price-history.interface";
import {ErrorPayload} from "store/store-types";

interface IInitialState {
  status:boolean;
  error:null|ErrorPayload;
  entities:IShotPriceHistory[]
}

const initialState: IInitialState = {
  status:false,
  error:null,
  entities:[]
}

export const priceHistorySlice = createSlice({
  name: '@@price-history',
  initialState,
  reducers: {
    getPriceHistoryTrigger:(state, {payload}:PayloadAction) => {},
    getPriceHistoryPending:(state, {payload}:PayloadAction) => {},
    getPriceHistoryFulfilled:(state, {payload}:PayloadAction) => {},
    getPriceHistoryRejected:(state, {payload}:PayloadAction) => {},
  }
})