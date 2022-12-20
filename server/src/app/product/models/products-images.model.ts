import {Model} from "objection";

import {ProductsModel} from "@/app/product/models/products.model";


class ProductsImagesModel extends Model {

  static get tableName() {
    return "products_images";
  }

  static get idColumn() {
    return "image_id";
  }

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "products_images.product",
        to: "products.product_id"
      }
    }
  }
}

export {ProductsImagesModel};