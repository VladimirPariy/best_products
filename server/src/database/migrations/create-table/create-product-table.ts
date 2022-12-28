import { Knex } from "knex";

export const createProductTable = (table: Knex.CreateTableBuilder) => {
  table.increments("product_id");
  table.string("product_title", 45).notNullable();
  table.string("product_description", 255).notNullable();
  table.decimal("price", 20, 2).notNullable();
};
