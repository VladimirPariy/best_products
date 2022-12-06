import {Product} from "@/database/models/products/product";
import {Model} from "objection";

class ProductImage extends Model {

  static get tableName() {
    return "products_images";
  };

  static get idColumn() {
    return "image_id";
  };

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: "products_images.product",
          to: "products.product_id"
        }
      }
    }
  };
}

export {ProductImage};