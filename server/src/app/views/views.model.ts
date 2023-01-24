import Objection, { Model } from "objection";

import { ProductsModel } from "@/app/products/models/products.model";

class ViewsModel extends Model {
  view_id: number;
  product: number;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "views";
  }

  static get idColumn() {
    return "view_id";
  }

  static get relationMappings() {
    return {
      // products: {
      //   relation: Model.HasOneRelation,
      //   modelClass: ProductsModel,
      //   join: {
      //     from: "views.product",
      //     to: "products.product_id"
      //   }
      // }
    };
  }

  $beforeInsert() {
    this.created_at = ViewsModel.fn.now();
    this.updated_at = ViewsModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = ViewsModel.fn.now();
  }
}

export { ViewsModel };
