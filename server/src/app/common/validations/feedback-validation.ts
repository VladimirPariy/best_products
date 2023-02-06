import * as yup from "yup";

export const addFeedbackSchema = yup.object({
  productId: yup.number().integer().positive().required(),
  userId: yup.number().integer().positive().required(),
  feedbackType: yup.number().integer().positive().required().min(0).max(1),
});
