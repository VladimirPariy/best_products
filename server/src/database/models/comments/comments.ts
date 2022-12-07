import {Model} from "objection";

import {Products} from "@/database/models/products/products";
import {Users} from "@/database/models/users/users";


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
      modelClass: Users,
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