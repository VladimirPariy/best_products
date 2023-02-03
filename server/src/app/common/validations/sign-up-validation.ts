import * as yup from "yup";

export const signUpSchema = yup.object({
  firstName: yup.string().nullable(false).required(),
  lastName: yup.string().nullable(false).required(),
  email: yup.string().email().nullable(false).required(),
  password: yup
    .string()
    .min(5)
    .nullable(false)
    .matches(/^([A-Za-z0-9]*)$/gi, "Password can contain only Latin letters")
    .required(),
  isGetUpdate: yup.boolean().nullable(false).required(),
});
