import {Model} from "objection";

import {Products} from "@/database/models/products/products";


class ProductsImages extends Model {

  static get tableName() {
    return "products_images";
  }

  static get idColumn() {
    return "image_id";
  }

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "products_images.product",
        to: "products.product_id"
      }
    }
  }
}

export {ProductsImages};