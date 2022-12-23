import {Knex} from "knex";
import {createUsers} from "../faker/create-random-users";
import {createProducts} from "../faker/create-fake-products";
import {addPhotoToProduct} from "../faker/add-photo-to-product";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("favorite_products").del();
  await knex("feedbacks").del();
  await knex("feedbacks_types").del();
  await knex("views").del();
  await knex("products_images").del();
  await knex("product_characteristics").del();
  await knex("price_history").del();
  await knex("product_subcategories").del();
  await knex("subcategories").del();
  await knex("categories").del();
  await knex("products").del();
  await knex("users").del();
  await knex("roles").del();


  // Inserts seed entries
  await knex("roles").insert([
    {
      role_id: 1,
      role_title: "admin"
    },
    {
      role_id: 2,
      role_title: "user"
    },
  ]);


  await knex("users").insert(createUsers());

  await knex("categories").insert([
    {
      category_id: 1,
      category_title: "Electronics",
    },
    {
      category_id: 2,
      category_title: "Cars",
    }
  ]);

  await knex("products").insert(createProducts());
  await knex("products_images").insert(addPhotoToProduct());


  await knex("product_characteristics").insert([
    {
      product_characteristic_id: 1,
      product: 1,
      characteristic_title: "Screen size",
      characteristic_description: 7.89
    },
    {
      product_characteristic_id: 2,
      product: 1,
      characteristic_title: "Number of Cores",
      characteristic_description: "4"
    },
    {
      product_characteristic_id: 3,
      product: 2,
      characteristic_title: "Number of Cores",
      characteristic_description: "1"
    },
  ]);

  await knex("price_history").insert([
    {
      price_history_id: 1,
      product: 1,
      price_at_timestamp: 699.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      price_history_id: 2,
      product: 1,
      price_at_timestamp: 799.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      price_history_id: 3,
      product: 1,
      price_at_timestamp: 999.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      price_history_id: 4,
      product: 2,
      price_at_timestamp: 2555.00,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      price_history_id: 5,
      product: 2,
      price_at_timestamp: 2999.99,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);


  await knex("subcategories").insert([
    {
      subcategory_id: 1,
      category: 1,
      subcategory_title: 'Laptop'
    },
    {
      subcategory_id: 2,
      category: 1,
      subcategory_title: 'Mobile phone'
    },
    {
      subcategory_id: 3,
      category: 2,
      subcategory_title: 'Hatchback'
    }
  ]);

  await knex("product_subcategories").insert([
    {
      product: 1,
      subcategory: 2,
    },
    {
      product: 2,
      subcategory: 1,
    },
  ]);
  await knex("comments").insert([
    {
      comment_id: 1,
      user: 2,
      product: 2,
      comment_msg: 'Gooood!!!!',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      comment_id: 2,
      user: 1,
      product: 1,
      comment_msg: 'Gooooddddd!!!!',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      comment_id: 3,
      user: 1,
      product: 1,
      comment_msg: 'Very Gooooddddd!!!!',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      comment_id: 4,
      user: 3,
      product: 1,
      comment_msg: 'Very very Gooooddddd!!!!',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);


}
