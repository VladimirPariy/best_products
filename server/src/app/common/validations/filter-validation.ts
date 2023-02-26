import * as yup from "yup";
import { OrderBy } from "../enums/OrderBy";

export const filterSchema = yup.object({
  page: yup.number().integer().positive().optional().default(0),
  limit: yup.number().integer().positive().optional().default(10),
  category: yup.string().required(),
  orderBy: yup.string().required().oneOf([OrderBy.DESC, OrderBy.ASC]),
  filter: yup.object({
    subcategoryId: yup.number().positive().integer().nullable(true),
    minPrice: yup.number().positive().integer().nullable(true),
    maxPrice: yup.number().positive().integer().nullable(true),
    selectedParameters: yup.string().min(1).nullable(true),
  }),
});
