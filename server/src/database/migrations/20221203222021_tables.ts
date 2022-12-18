import {Knex} from "knex";

import {createCategoriesTable} from "./create-categories-table";
import {createCharacteristicsTable} from "./create-characteristics-table";
import {createCommentsTable} from "./create-comments-table";
import {createFavoriteProductsTable} from "./create-favorite-products-table";
import {createFeedbacksTable} from "./create-feedbacks-table";
import {createFeedbacksTypesTable} from "./create-feedbacks-types-table";
import {createPriceHistoryTable} from "./create-price-history-table";
import {createProductCharacteristicsTable} from "./create-product-characteristics-table";
import {createProductImageTable} from "./create-product-image-table";
import {createProductSubcategoriesTable} from "./create-product-subcategories-table";
import {createProductTable} from "./create-product-table";
import {createRolesTable} from "./create-roles-table";
import {createSubcategoriesTable} from "./create-subcategories-table";
import {createUsersTable} from "./create-users-table";
import {createViewsTable} from "./create-views-table";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
  .createTable("roles", createRolesTable)
  .createTable("users", createUsersTable)
  .createTable("categories", createCategoriesTable)
  .createTable("subcategories", createSubcategoriesTable)
  .createTable("products", createProductTable)
  .createTable("products_images", createProductImageTable)
  .createTable("characteristics", createCharacteristicsTable)
  .createTable("product_characteristics", createProductCharacteristicsTable)
  .createTable("price_history", createPriceHistoryTable)
  .createTable("feedbacks_types", createFeedbacksTypesTable)
  .createTable("feedbacks", createFeedbacksTable)
  .createTable("views", createViewsTable)
  .createTable("favorite_products", createFavoriteProductsTable)
  .createTable("comments", createCommentsTable)
  .createTable("product_subcategories", createProductSubcategoriesTable);
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