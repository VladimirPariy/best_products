import {createForeignKeyHelper} from "./helper";
import {Knex} from "knex";

export const createPriceHistoryTable = (table: Knex.CreateTableBuilder) => {
  table.increments("price_history_id");
  createForeignKeyHelper(table, "product", "product_id", "products")
  table.decimal("price_at_timestamp", 10, 2).notNullable();
  table.timestamps(true);
}