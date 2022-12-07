import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {

  const createForeignKeyHelper = <T>(table: Knex.CreateTableBuilder,
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


  return knex.schema
  .createTable("roles", table => {
    table.increments("role_id");
    table.string("role_title", 10).unique().notNullable();
  }) //
  .createTable("users", (table) => {
    table.increments("user_id");
    table.string("first_name", 20).notNullable();
    table.string("last_name", 20).notNullable();
    table.string("email", 30).unique().notNullable();
    table.string("password", 255).notNullable();
    table.string("phone_number", 15).unique().notNullable();
    table.string("user_photo");
    table.timestamps(true);
    createForeignKeyHelper(table, "role", "role_id", "roles");
  })
  .createTable("categories", (table) => {
    table.increments("category_id");
    table.string("category_title", 45).notNullable();
  })
  .createTable("subcategories", (table) => {
    table.increments("subcategory_id");
    createForeignKeyHelper(table, "category", "category_id", "categories")
    table.string("subcategory_title", 45).notNullable();
  })
  .createTable("products", (table) => {
    table.increments("product_id");
    table.string("product_title", 45).notNullable();
    table.string("product_description", 255).notNullable();
    table.decimal("price", 20, 2).notNullable();
  })
  .createTable("products_images", (table) => {
    table.increments("image_id");
    createForeignKeyHelper(table, "product", "product_id", "products")
    table.string("image_title").notNullable();
  })
  .createTable("characteristics", (table) => {
    table.increments("characteristic_id");
    table.string("characteristic_title", 20).notNullable();
  })
  .createTable("product_characteristics", (table) => {
    table.increments("product_characteristic_id");
    createForeignKeyHelper(table, "product", "product_id", "products")
    createForeignKeyHelper(table, "characteristic", "characteristic_id", "characteristics")
    table.string("characteristic_description", 50).notNullable();
  })
  .createTable("price_history", (table) => {
    table.increments("price_history_id");
    createForeignKeyHelper(table, "product", "product_id", "products")
    table.decimal("price_at_timestamp", 10, 2).notNullable();
    table.timestamps(true);
  })
  .createTable("feedbacks_types", (table) => {
    table.increments("feedback_type_id");
    table.integer("type").notNullable();
  })
  .createTable("feedbacks", (table) => {
    createForeignKeyHelper(table, "user", "user_id", "users")
    createForeignKeyHelper(table, "product", "product_id", "products")
    createForeignKeyHelper(table, "feedback_type", "feedback_type_id", "feedbacks_types")
    table.primary(["user", "product"])
    table.timestamps(true);
  })
  .createTable("views", (table) => {
    table.increments("view_id")
    createForeignKeyHelper(table, "user", "user_id", "users")
    createForeignKeyHelper(table, "product", "product_id", "products")
    table.timestamps(true);
  })
  .createTable("favorite_products", (table) => {
    createForeignKeyHelper(table, "user", "user_id", "users")
    createForeignKeyHelper(table, "product", "product_id", "products")
    table.primary(["user", "product"])
    table.timestamps(true);
  })
  .createTable("comments", (table) => {
    table.increments("comment_id");
    createForeignKeyHelper(table, "user", "user_id", "users")
    createForeignKeyHelper(table, "product", "product_id", "products")
    table.string("comment_msg", 255).notNullable();
    table.timestamps(true);
  })
  .createTable("product_subcategories", (table) => {
    createForeignKeyHelper(table, "product", "product_id", "products")
    createForeignKeyHelper(table, "subcategory", "subcategory_id", "subcategories");
    table.primary(["product", "subcategory"]);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
  .dropTableIfExists("comments")
  .dropTableIfExists("favorite_products")
  .dropTableIfExists("feedbacks")
  .dropTableIfExists("feedbacks_types")
  .dropTableIfExists("views")
  .dropTableIfExists("products_images")
  .dropTableIfExists("product_characteristics")
  .dropTableIfExists("price_history")
  .dropTableIfExists("product_subcategories")
  .dropTableIfExists("subcategories")
  .dropTableIfExists("categories")
  .dropTableIfExists("characteristics")
  .dropTableIfExists("products")
  .dropTableIfExists("users")
  .dropTableIfExists("roles")
}