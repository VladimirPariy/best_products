import {Model} from "objection";

import {ProductsModel} from "@/app/product/models/products.model";


class PriceHistoryModel extends Model {
  static get tableName() {
    return "price_history";
  };

  static get idColumn() {
    return "price_history_id";
  };

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "price_history.product",
        to: "products.product_id"
      }
    }
  }
}

export {PriceHistoryModel};
