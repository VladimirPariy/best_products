import {Model} from "objection";

import {Products} from "@/database/models/products/products";
import {Users} from "@/database/models/users/users";


class Views extends Model {
  static get tableName() {
    return "views";
  }

  static get idColumn() {
    return "view_id";
  }


  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: Users,
      join: {
        from: "views.user",
        to: "users.user_id"
      }
    },
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "views.product",
        to: "products.product_id"
      }
    }
  }
}

export {Views};