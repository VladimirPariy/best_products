import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createFeedbacksTable = (table: Knex.CreateTableBuilder) => {
  createForeignKeyHelper(table, "user", "user_id", "users");
  createForeignKeyHelper(table, "product", "product_id", "products");
  createForeignKeyHelper(table, "feedback_type", "feedback_type_id", "feedbacks_types");
  table.primary(["user", "product"]);
  table.timestamps(true);
};
