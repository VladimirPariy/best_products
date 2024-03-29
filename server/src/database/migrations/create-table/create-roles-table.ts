import { Knex } from "knex";

export const createRolesTable = (table: Knex.CreateTableBuilder) => {
  table.increments("role_id");
  table.string("role_title").unique().notNullable();
};
