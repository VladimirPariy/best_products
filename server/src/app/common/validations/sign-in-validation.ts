import * as yup from "yup";

export const signInSchema = yup.object({
  login: yup.string().nullable(false).required(),
  password: yup
    .string()
    .min(5)
    .nullable(false)
    .required()
    .matches(/^([A-Za-z0-9]*)$/gi, "Password can contain only Latin letters"),
});
