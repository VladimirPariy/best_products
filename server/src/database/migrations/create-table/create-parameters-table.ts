import { Knex } from "knex";
import { createForeignKeyHelper } from "./helper";

export const createParametersTable = (table: Knex.CreateTableBuilder) => {
  table.increments("parameter_id");
  createForeignKeyHelper(
    table,
    "subcategory",
    "subcategory_id",
    "subcategories"
  );
  table.string("parameter_title").notNullable();
};
