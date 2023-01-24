import { feedbacksSlice } from "store/feedbacks/feedbacks-slice";

export const {
  getFeedbacksTrigger,
  getFeedbacksPending,
  getFeedbacksRejected,
  getFeedbacksFulfilled,
  clearFeedbacks,
} = feedbacksSlice.actions;
