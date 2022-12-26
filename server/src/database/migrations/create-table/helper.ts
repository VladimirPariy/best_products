import {Knex} from "knex";

export const createForeignKeyHelper = <T>(table: Knex.CreateTableBuilder,
                                          field: string,
                                          refer: string,
                                          referTable: string,
                                          defaultTo?: T) => {
  if (defaultTo) {
    table.integer(field).unsigned().notNullable().defaultTo(defaultTo);
    table.foreign(field).references(refer).inTable(referTable);
    return;
  }
  table.integer(field).unsigned().notNullable();
  table.foreign(field).references(refer).inTable(referTable);
}