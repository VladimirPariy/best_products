import Objection, { Model } from "objection";

import { ProductsModel } from "@/app/products/models/products.model";

class PriceHistoryModel extends Model {
  price_history_id: number;
  product: number;
  price_at_timestamp: number;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "price_history";
  }

  static get idColumn() {
    return "price_history_id";
  }

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "price_history.product",
        to: "products.product_id",
      },
    },
  };

  $beforeInsert() {
    this.created_at = PriceHistoryModel.fn.now();
    this.updated_at = PriceHistoryModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = PriceHistoryModel.fn.now();
  }
}

export { PriceHistoryModel };
