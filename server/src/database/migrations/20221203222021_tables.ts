import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable("roles", table => {
    table.increments("role_id");
    table.string("role_name", 10).unique().notNullable();
  })
  .createTable("users", (table) => {
    table.increments("user_id");
    table.string("first_name", 20).notNullable();
    table.string("last_name", 20).notNullable();
    table.string("email", 30).unique().notNullable();
    table.string("password", 255).notNullable();
    table.string("phone_number", 15).unique().notNullable();
    table.string("user_photo");
    table.timestamps(true);
    table.integer("role").unsigned();
    table.foreign("role").references("role_id").inTable("roles");
  })
  .createTable("product", (table) => {
    table.increments("product_id");
    table.string("product_title", 45).notNullable();
    table.string("product_description", 255).notNullable();
    table.decimal("price", 20, 2).notNullable();
  })
  .createTable("product_images", (table) => {
    table.increments("image_id");
    table.integer("product").unsigned().notNullable();
    table.string("image_title").notNullable();
    table.foreign("product").references("product_id").inTable("product");
  })
  .createTable("characteristics", (table) => {
    table.increments("characteristic_id");
    table.string("characteristic_title", 20).notNullable();
  })
  .createTable("prod_characteristic", (table) => {
    table.increments("prod_characteristic_id");
    table.integer("product").notNullable().unsigned();
    table.integer("characteristic").notNullable().unsigned();
    table.string("characteristic_description", 50).notNullable();
    table.foreign("product").references("product_id").inTable("product");
    table.foreign("characteristic").references("characteristic_id").inTable("characteristics");
  })

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTable("users")
  .dropTable("roles")
  .dropTable("product_images")
  .dropTable("prod_characteristic")
  .dropTable("characteristics")
  .dropTable("product")
}


// const userTable = (table: Knex.CreateTableBuilder) => {
//   table.increments("user_id");
//   table.string("first_name", 20).notNullable();
//   table.string("last_name", 20).notNullable();
//   table.string("email", 30).unique().notNullable();
//   table.string("password", 255).notNullable();
//   table.string("phone_number", 15).unique().notNullable();
//   table.string("user_photo");
//   table.timestamps(true);
//   table.integer("role").unsigned();
//   table.foreign("role").references("role_id").inTable("roles");
// }
