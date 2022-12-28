import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createSubcategoriesTable = (table: Knex.CreateTableBuilder) => {
  table.increments("subcategory_id");
  createForeignKeyHelper(table, "category", "category_id", "categories");
  table.string("subcategory_title", 45).notNullable();
};
