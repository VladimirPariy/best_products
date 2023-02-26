import * as yup from "yup";

export const updateProductSchema = yup
  .object({
    product_subcategory: yup.number().integer().positive().optional(),
    category: yup.number().integer().positive().optional(),
    price: yup.number().positive().optional(),
    product_title: yup.string().min(3).optional(),
    product_description: yup.string().min(5).optional(),
    product_characteristics: yup.array(yup.number().positive().integer().required()).optional(),
  })
  .test("There are no fields to update", (value) => {
    const isAtLeastOne =
      !value.category &&
      !value.price &&
      !value.product_characteristics &&
      !value.product_description &&
      !value.product_subcategory &&
      !value.product_title;

    if (isAtLeastOne) {
      return new yup.ValidationError("Missed all fields for update");
    }
    return true;
  });
