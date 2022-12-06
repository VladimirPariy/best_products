import {Product} from "@/database/models/products/product";
import {Model} from "objection";

class PriceHistory extends Model{
  static get tableName() {
    return "price_history";
  };

  static get idColumn() {
    return "price_history_id";
  };

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: "price_history.product",
          to: "products.product_id"
        }
      }
    }
  };
}

export {PriceHistory};
