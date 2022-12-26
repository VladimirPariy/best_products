import {createForeignKeyHelper} from "./helper";
import {Knex} from "knex";

export const createProductCharacteristicsTable = (table: Knex.CreateTableBuilder) => {
  table.increments("product_characteristic_id");
  createForeignKeyHelper(table, "product", "product_id", "products")
  table.string("characteristic_title", 50).notNullable();
  table.string("characteristic_description", 50).notNullable();
}