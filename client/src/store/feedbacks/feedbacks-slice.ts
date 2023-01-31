import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDataForAddFeedback,
  IFeedback,
} from "lib/interfaces/feedbacks.interface";
import { ErrorPayload } from "lib/interfaces/store.types";

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
    feedbacksPending: (state) => {
      state.error = null;
      state.status = true;
    },

    feedbacksRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.status = false;
    },

    getFeedbacksTrigger: (_, { payload }: PayloadAction<number>) => {},

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

    addFeedbackFulfilled: (state, { payload }: PayloadAction<IFeedback>) => {
      state.status = false;
      state.error = null;
      state.entities = state.entities.concat(payload);
    },
  },
});
