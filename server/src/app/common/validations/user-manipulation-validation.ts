import * as yup from "yup";

export const userManipulationSchema = yup.object({
  userId: yup.number().integer().positive().required(),
  productId: yup.number().integer().positive().required(),
});
