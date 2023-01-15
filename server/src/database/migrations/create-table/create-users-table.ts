import { createForeignKeyHelper } from "./helper";
import { Knex } from "knex";

export const createUsersTable = (table: Knex.CreateTableBuilder) => {
  table.increments("user_id");
  table.string("first_name").notNullable();
  table.string("last_name").notNullable();
  table.string("email").unique().notNullable();
  table.string("password").notNullable();
  table.string("phone_number").unique();
  table.string("user_photo");
  table.boolean("is_get_update").notNullable().defaultTo(true);
  table.timestamps(true, true);
  createForeignKeyHelper(table, "role", "role_id", "roles", 2);
};
