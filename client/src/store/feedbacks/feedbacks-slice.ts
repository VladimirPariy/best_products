import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDataForAddFeedback,
  IFeedback,
} from "lib/interfaces/feedbacks/feedbacks.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  entities: IFeedback[];
  status: boolean;
  error: null | ErrorPayload;
}

const initialState: IInitialState = {
  entities: [],
  status: false,
  error: null,
};

export const feedbacksSlice = createSlice({
  name: "@@feedbacks",
  initialState,
  reducers: {
    getFeedbacksTrigger: (_, { payload }: PayloadAction<number>) => {},
    getFeedbacksPending: (state) => {
      state.error = null;
      state.status = true;
    },
    getFeedbacksRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.status = false;
    },
    getFeedbacksFulfilled: (state, { payload }: PayloadAction<IFeedback[]>) => {
      state.error = null;
      state.status = false;
      state.entities = payload;
    },
    clearFeedbacks: () => {
      return initialState;
    },
    addFeedbackTrigger: (
      _,
      { payload }: PayloadAction<IDataForAddFeedback>
    ) => {},
    addFeedbackPending: (state) => {
      state.error = null;
      state.status = true;
    },
    addFeedbackRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.status = false;
      state.error = payload;
    },
    addFeedbackFulfilled: (state, { payload }: PayloadAction<IFeedback>) => {
      state.status = false;
      state.error = null;
      state.entities = state.entities.concat(payload);
    },
  },
});
