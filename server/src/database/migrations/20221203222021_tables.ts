import {Knex} from "knex";

import {createCategoriesTable} from "./create-table/create-categories-table";
import {createCommentsTable} from "./create-table/create-comments-table";
import {createFavoriteProductsTable} from "./create-table/create-favorite-products-table";
import {createFeedbacksTable} from "./create-table/create-feedbacks-table";
import {createFeedbacksTypesTable} from "./create-table/create-feedbacks-types-table";
import {createPriceHistoryTable} from "./create-table/create-price-history-table";
import {createProductCharacteristicsTable} from "./create-table/create-product-characteristics-table";
import {createProductImageTable} from "./create-table/create-product-image-table";
import {createProductSubcategoriesTable} from "./create-table/create-product-subcategories-table";
import {createProductTable} from "./create-table/create-product-table";
import {createRolesTable} from "./create-table/create-roles-table";
import {createSubcategoriesTable} from "./create-table/create-subcategories-table";
import {createUsersTable} from "./create-table/create-users-table";
import {createViewsTable} from "./create-table/create-views-table";
import {createTempImagesTable} from "./create-table/create-temp-images-table";


export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable("roles", createRolesTable)
		.createTable("users", createUsersTable)
		.createTable("categories", createCategoriesTable)
		.createTable("subcategories", createSubcategoriesTable)
		.createTable("products", createProductTable)
		.createTable("products_images", createProductImageTable)
		.createTable("product_characteristics", createProductCharacteristicsTable)
		.createTable("price_history", createPriceHistoryTable)
		.createTable("feedbacks_types", createFeedbacksTypesTable)
		.createTable("feedbacks", createFeedbacksTable)
		.createTable("views", createViewsTable)
		.createTable("favorite_products", createFavoriteProductsTable)
		.createTable("comments", createCommentsTable)
		.createTable("product_subcategories", createProductSubcategoriesTable)
		.createTable("temp_images", createTempImagesTable)
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTableIfExists("temp_images")
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
		.dropTableIfExists("products")
		.dropTableIfExists("users")
		.dropTableIfExists("roles")
}