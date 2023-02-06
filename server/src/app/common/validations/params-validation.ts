import * as yup from "yup";

export const paramsSchema = yup.object({
  id: yup.number().integer().positive().required(),
});
