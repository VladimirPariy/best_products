import * as yup from "yup";

export const viewSchema = yup.object({
  productId: yup.number().integer().positive().required(),
});
