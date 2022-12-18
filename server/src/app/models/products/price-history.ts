import {Model} from "objection";

import {Products} from "@/app/models/products/products";


class PriceHistory extends Model {
  static get tableName() {
    return "price_history";
  };

  static get idColumn() {
    return "price_history_id";
  };

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "price_history.product",
        to: "products.product_id"
      }
    }
  }
}

export {PriceHistory};
