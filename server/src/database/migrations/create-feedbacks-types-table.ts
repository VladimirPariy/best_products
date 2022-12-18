import {Knex} from "knex";

export const createFeedbacksTypesTable = (table: Knex.CreateTableBuilder) => {
  table.increments("feedback_type_id");
  table.integer("type").notNullable();
}