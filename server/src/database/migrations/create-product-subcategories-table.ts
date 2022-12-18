import {createForeignKeyHelper} from "./helper";
import {Knex} from "knex";

export const createProductSubcategoriesTable = (table: Knex.CreateTableBuilder) => {
  createForeignKeyHelper(table, "product", "product_id", "products")
  createForeignKeyHelper(table, "subcategory", "subcategory_id", "subcategories");
  table.primary(["product", "subcategory"]);
}