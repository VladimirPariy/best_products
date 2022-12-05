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
    table.integer("role").unsigned().notNullable();
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
  .createTable("price_history", (table) => {
    table.increments("price_history_id");
    table.integer("product").notNullable().unsigned();
    table.decimal("price_at_timestamp", 10, 2).notNullable();
    table.timestamps(true);
    table.foreign("product").references("product_id").inTable("product");
  })
  .createTable("feedback_types", (table) => {
    table.increments("feedback_type_id");
    table.integer("type").notNullable();
  })
  .createTable("feedback", (table) => {
    table.integer("user").notNullable().unsigned();
    table.integer("product").notNullable().unsigned();
    table.integer("feedback_type").notNullable().unsigned();
    table.timestamps(true);
    table.foreign("feedback_type").references("feedback_type_id").inTable("feedback_types");
    table.foreign("user").references("user_id").inTable("users");
    table.foreign("product").references("product_id").inTable("product");
    table.primary(["user", "product"])
  })
  .createTable("views", (table) => {
    table.increments("view_id")
    table.integer("user").notNullable().unsigned();
    table.integer("product").notNullable().unsigned();
    table.timestamps(true);
    table.foreign("user").references("user_id").inTable("users");
    table.foreign("product").references("product_id").inTable("product");
  })
  .createTable("favourite_prod", (table) => {
    table.integer("user").unsigned().notNullable();
    table.integer("product").unsigned().notNullable();
    table.timestamps(true);
    table.foreign("user").references("user_id").inTable("users");
    table.foreign("product").references("product_id").inTable("product");
    table.primary(["user", "product"])
  })
  .createTable("comments", (table) => {
    table.increments("comments_id");
    table.integer("user").notNullable().unsigned();
    table.integer("product").notNullable().unsigned();
    table.string("comments_msg", 255).notNullable();
    table.timestamps(true);
    table.foreign("user").references("user_id").inTable("users");
    table.foreign("product").references("product_id").inTable("product");
  })
  .createTable("categories", (table) => {
    table.increments("category_id");
    table.string("category_title", 45).notNullable();
  })
  .createTable("subcategories", (table) => {
    table.increments("subcategory_id");
    table.string("subcategory_title", 45).notNullable();
    table.integer("category").unsigned().notNullable();
    table.foreign("category").references("category_id").inTable("categories");
  })
  .createTable("prod_subcategories", (table) => {
    table.integer("product").unsigned().notNullable();
    table.integer("subcategory").unsigned().notNullable();
    table.foreign("subcategory").references("subcategory_id").inTable("subcategories");
    table.foreign("product").references("product_id").inTable("product");
    table.primary(["product", "subcategory"]);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTable("comments")
  .dropTable("favourite_prod")
  .dropTable("feedback")
  .dropTable("feedback_types")
  .dropTable("views")
  .dropTable("product_images")
  .dropTable("prod_characteristic")
  .dropTable("price_history")
  .dropTable("prod_subcategories")
  .dropTable("subcategories")

  .dropTable("categories")
  .dropTable("characteristics")
  .dropTable("product")
  .dropTable("users")
  .dropTable("roles")
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
