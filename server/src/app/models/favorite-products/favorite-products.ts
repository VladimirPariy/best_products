import {Model} from "objection";

import {Products} from "@/app/models/products/products";
import {UsersModel} from "@/app/user/models/users.model";


class FavoriteProducts extends Model {
  static get tableName() {
    return "favorite_products";
  };

  static get idColumn() {
    return ["user", "product"];
  }

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "favorite_products.product",
        to: "products.product_id"
      }
    },
    users: {
      relation: Model.HasOneRelation,
      modelClass: UsersModel,
      join: {
        from: "favorite_products.user",
        to: "users.user_id"
      }
    }
  }
}

export {FavoriteProducts};