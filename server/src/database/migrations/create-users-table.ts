import {createForeignKeyHelper} from "./helper";
import {Knex} from "knex";

export const createUsersTable = (table: Knex.CreateTableBuilder) => {
  table.increments("user_id");
  table.string("first_name", 20).notNullable();
  table.string("last_name", 20).notNullable();
  table.string("email", 50).unique().notNullable();
  table.string("password", 255).notNullable();
  table.string("phone_number", 30).unique();
  table.string("user_photo");
  table.boolean("is_get_update").notNullable().defaultTo(true);
  table.timestamps(true, true);
  createForeignKeyHelper(table, "role", "role_id", "roles", 2);
}