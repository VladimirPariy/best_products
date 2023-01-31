import { RootState } from "lib/interfaces/store.types";

export const selectFeedbacks = (state: RootState) => state.feedbacks.entities;
