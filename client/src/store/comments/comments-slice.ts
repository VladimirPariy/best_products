import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDataForAddComment,
  IShotCommentsWithUser,
} from "lib/interfaces/comments/comments.interface";
import { ErrorPayload } from "store/store-types";

interface IInitialState {
  status: boolean;
  error: null | ErrorPayload;
  entities: IShotCommentsWithUser[];
}

const initialState: IInitialState = {
  status: false,
  error: null,
  entities: [],
};

export const commentsSlice = createSlice({
  name: "@@comments",
  initialState,
  reducers: {
    getCommentsTrigger: (_, { payload }: PayloadAction<number>) => {},
    getCommentsPending: (state) => {
      state.error = null;
      state.status = true;
      state.entities = [];
    },
    getCommentsFulfilled: (
      state,
      { payload }: PayloadAction<IShotCommentsWithUser[]>
    ) => {
      state.status = false;
      state.error = null;
      state.entities = payload;
    },
    getCommentsRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.status = false;
      state.error = payload;
      state.entities = [];
    },

    addCommentTrigger: (_, action: PayloadAction<IDataForAddComment>) => {},
    addCommentPending: (state) => {
      state.error = null;
      state.status = true;
    },
    addCommentFulfilled: (
      state,
      { payload }: PayloadAction<IShotCommentsWithUser>
    ) => {
      state.error = null;
      state.status = false;
      state.entities = state.entities.concat(payload);
    },
    addCommentRejected: (state, { payload }: PayloadAction<ErrorPayload>) => {
      state.error = payload;
      state.status = false;
    },

    removeCommentTrigger: (_, { payload }: PayloadAction<number>) => {},
    removeCommentPending: (state) => {
      state.error = null;
      state.status = true;
    },
    removeCommentFulfilled: (
      state,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      const { id } = payload;
      state.error = null;
      state.status = false;
      state.entities = state.entities.filter((item) => item.comment_id !== id);
    },
    removeCommentRejected: (
      state,
      { payload }: PayloadAction<ErrorPayload>
    ) => {
      state.error = payload;
      state.status = false;
    },
  },
});
