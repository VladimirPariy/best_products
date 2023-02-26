import * as yup from "yup";

export const createProductSchema = yup.object({
  category: yup.number().integer().positive().required(),
  subcategory: yup.number().integer().positive().required(),
  productTitle: yup.string().required().min(3),
  productDescription: yup.string().required().min(5),
  price: yup.number().positive().required(),
  chars: yup.array(yup.number().integer().positive().required()).required(),
  imgs: yup
    .array(
      yup.object({
        size: yup.number().integer().positive().required(),
        original_title: yup.string().required(),
        image_title: yup.string().required(),
        image_id: yup.number().integer().positive().required(),
      })
    )
    .required(),
});
