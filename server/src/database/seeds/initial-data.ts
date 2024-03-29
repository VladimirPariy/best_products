import { Knex } from "knex";
import { knexInstance } from "../connectingDb";

import { createUsers } from "./faker/create-fake-random-users";
import { createProducts } from "./faker/create-fake-products";
import { createFakeProductsImages } from "./faker/create-fake-products_images";
import { createPriceHistory } from "./faker/create-fake-price-history";
import { createSubcategories } from "./faker/create-fake-subcategory";
import { createProductSubcategories } from "./faker/create-fake-product-subcategories";
import { createComments } from "./faker/create-fake-comments";
import { createFeedbacks } from "./faker/create-fake-feedbacks";
import { createFavoriteProduct } from "./faker/create-fake-favorite-product";
import { createViews } from "./faker/create-fake-views";
import { createParameters } from "./faker/create-fake-parameters";
import { createCharacteristics } from "./faker/create-fake-characteristics";
import { createProductCharacteristics } from "./faker/create-fake-product-characteristic";

import { roles } from "./faker/create-roles";
import { categories } from "./faker/create-categories";
import { feedbackTypes } from "./faker/create-feedback-types";

export async function seed(knex: Knex): Promise<void> {
  await knex("product_characteristics").del();
  await knex("characteristics").del();
  await knex("parameters").del();
  await knex("comments").del();
  await knex("favorite_products").del();
  await knex("feedbacks").del();
  await knex("feedbacks_types").del();
  await knex("views").del();
  await knex("products_images").del();
  await knex("price_history").del();
  await knex("product_subcategories").del();
  await knex("subcategories").del();
  await knex("categories").del();
  await knex("products").del();
  await knex("users").del();
  await knex("roles").del();

  await knex("roles").insert(roles);
  await knex("categories").insert(categories);
  await knex("users").insert(createUsers());
  await knex("products").insert(createProducts());
  await knex("products_images").insert(createFakeProductsImages());
  await knex("price_history").insert(createPriceHistory(knex));
  await knex("subcategories").insert(createSubcategories());
  await knex("product_subcategories").insert(createProductSubcategories());
  await knex("comments").insert(createComments(knex));
  await knex("views").insert(createViews(knex));
  await knex("feedbacks_types").insert(feedbackTypes);
  await knex("feedbacks").insert(createFeedbacks(knex));
  await knex("favorite_products").insert(createFavoriteProduct(knex));
  await knex("parameters").insert(createParameters());
  await knex("characteristics").insert(createCharacteristics());
  const prod = await knexInstance.select("*").from("product_subcategories");
  const param = await knexInstance.select("*").from("parameters");
  const chars = await knexInstance.select("*").from("characteristics");
  await knex("product_characteristics").insert(createProductCharacteristics(prod, param, chars));
}
