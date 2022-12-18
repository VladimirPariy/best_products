import {Knex} from "knex";

export const createCharacteristicsTable = (table: Knex.CreateTableBuilder) => {
  table.increments("characteristic_id");
  table.string("characteristic_title", 20).notNullable();
}