import { feedbacksSlice } from "store/feedbacks/feedbacks-slice";

export const {
	getFeedbacksTrigger,
	feedbacksPending,
	feedbacksRejected,
	getFeedbacksFulfilled,
	clearFeedbacks,
	addFeedbackTrigger,
	addFeedbackFulfilled,
} = feedbacksSlice.actions;
