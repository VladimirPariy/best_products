import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createProductImageTable = (table: Knex.CreateTableBuilder) => {
  table.increments("image_id");
  createForeignKeyHelper(table, "product", "product_id", "products");
  table.string("image_title").notNullable();
  table.string("original_title");
  table.integer("size");
};
