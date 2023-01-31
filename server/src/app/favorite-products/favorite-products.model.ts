import Objection, { Model } from "objection";

import { ProductsModel } from "../products/models/products.model";
import { UsersModel } from "../users/models/users.model";

export class FavoriteProductsModel extends Model {
  user: number;
  product: number;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "favorite_products";
  }

  static get idColumn() {
    return ["user", "product"];
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "favorite_products.product",
          to: "products.product_id",
        },
      },
      users: {
        relation: Model.HasOneRelation,
        modelClass: UsersModel,
        join: {
          from: "favorite_products.user",
          to: "users.user_id",
        },
      },
    };
  }

  $beforeInsert() {
    this.created_at = FavoriteProductsModel.fn.now();
    this.updated_at = FavoriteProductsModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = FavoriteProductsModel.fn.now();
  }
}
