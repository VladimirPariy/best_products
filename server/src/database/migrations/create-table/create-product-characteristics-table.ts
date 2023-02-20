import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createProductCharacteristicsTable = (table: Knex.CreateTableBuilder) => {
  table.increments("product_characteristic_id");
  createForeignKeyHelper(table, "characteristic", "characteristic_id", "characteristics");
  createForeignKeyHelper(table, "product", "product_id", "products");
};
