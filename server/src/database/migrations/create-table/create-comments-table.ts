import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createCommentsTable = (table: Knex.CreateTableBuilder) => {
  table.increments("comment_id");
  createForeignKeyHelper(table, "user", "user_id", "users");
  createForeignKeyHelper(table, "product", "product_id", "products");
  table.string("comment_msg", 255).notNullable();
  table.timestamps(true);
};
