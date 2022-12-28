import {Knex} from "knex";

export const createTempImagesTable = (table: Knex.CreateTableBuilder) => {
	table.increments("image_id");
	table.string("image_title").notNullable();
	table.string("original_title");
	table.integer("size");
}