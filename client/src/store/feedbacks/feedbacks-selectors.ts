import { RootState } from "store/store-types";

const selectFeedbacks = (state: RootState) => state.feedbacks.entities;
const selectFeedbacksStatus = (state: RootState) => state.feedbacks.status;
const selectFeedbacksError = (state: RootState) => state.feedbacks.error;

export { selectFeedbacks, selectFeedbacksStatus, selectFeedbacksError };
