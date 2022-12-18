import {Model} from "objection";

import {Products} from "@/app/models/products/products";
import {UsersModel} from "@/app/user/models/users.model";


class Comments extends Model {
  static get tableName() {
    return "comments";
  };

  static get idColumn() {
    return "comment_id";
  }

  static relationMappings = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: UsersModel,
      join: {
        from: "comments.user",
        to: "users.user_id"
      }
    },
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "comments.product",
        to: "products.product_id"
      }
    }
  }
}

export {Comments};