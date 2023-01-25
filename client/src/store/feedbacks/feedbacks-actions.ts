import { feedbacksSlice } from "store/feedbacks/feedbacks-slice";

export const {
  getFeedbacksTrigger,
  getFeedbacksPending,
  getFeedbacksRejected,
  getFeedbacksFulfilled,
  clearFeedbacks,
  addFeedbackTrigger,
  addFeedbackPending,
  addFeedbackRejected,
  addFeedbackFulfilled,
} = feedbacksSlice.actions;
