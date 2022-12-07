import {Model} from "objection";

import {Products} from "@/database/models/products/products";
import {Users} from "@/database/models/users/users";


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
      modelClass: Users,
      join: {
        from: "favorite_products.user",
        to: "users.user_id"
      }
    }
  }
}

export {FavoriteProducts};