import * as yup from "yup";

export const updateUserSchema = yup
  .object({
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string().email(),
    password: yup
      .string()
      .min(5)
      .matches(/^([A-Za-z0-9]*)$/gi, "Password can contain only Latin letters"),
    phone_number: yup
      .string()
      .matches(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
        "phone number must be a valid phone number"
      ),
    is_get_update: yup.boolean(),
    user_photo: yup.string(),
  })
  .test("There are no fields to update", (value) => {
    const isAtLeastOne =
      !value.email &&
      !value.first_name &&
      !value.last_name &&
      !value.phone_number &&
      !value.password &&
      typeof value.is_get_update === "undefined" &&
      !value.user_photo;

    if (isAtLeastOne) {
      return new yup.ValidationError("Missed all fields for update");
    }
    return true;
  });
