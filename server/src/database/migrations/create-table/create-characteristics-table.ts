import {Knex} from "knex";
import {createForeignKeyHelper} from "./helper";

export const createCharacteristicsTable = (table: Knex.CreateTableBuilder) => {
	table.increments("characteristic_id");
	table.string("characteristic_title").notNullable();
	createForeignKeyHelper(table, "parameter", "parameter_id", "parameters",);
};