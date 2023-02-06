import * as yup from "yup";

export const roleSchema = yup.object({
  role: yup.number().integer().positive().required().min(1).max(2),
});
