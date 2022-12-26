import {Knex} from "knex";

export const createCategoriesTable = (table: Knex.CreateTableBuilder) => {
  table.increments("category_id");
  table.string("category_title", 45).notNullable();
}