import { Knex } from "knex";

export const createProductTable = (table: Knex.CreateTableBuilder) => {
  table.increments("product_id");
  table.string("product_title").notNullable();
  table.string("product_description").notNullable();
  table.decimal("price", 20, 2).notNullable();
};
