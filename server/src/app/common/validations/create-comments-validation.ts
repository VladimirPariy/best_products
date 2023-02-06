import * as yup from "yup";

export const createCommentsSchema = yup.object({
  productId: yup.number().integer().positive().required(),
  userId: yup.number().integer().positive().required(),
  message: yup.string().min(5).max(255).required(),
});
