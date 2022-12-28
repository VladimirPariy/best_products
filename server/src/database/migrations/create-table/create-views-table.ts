import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createViewsTable = (table: Knex.CreateTableBuilder) => {
  table.increments("view_id");
  createForeignKeyHelper(table, "user", "user_id", "users");
  createForeignKeyHelper(table, "product", "product_id", "products");
  table.timestamps(true);
};
