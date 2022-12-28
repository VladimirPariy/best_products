import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createFavoriteProductsTable = (table: Knex.CreateTableBuilder) => {
  createForeignKeyHelper(table, "user", "user_id", "users");
  createForeignKeyHelper(table, "product", "product_id", "products");
  table.primary(["user", "product"]);
  table.timestamps(true);
};
