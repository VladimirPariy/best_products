import {Model} from "objection";

import {Products} from "@/app/models/products/products";
import {UsersModel} from "@/app/user/models/users.model";


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
      modelClass: UsersModel,
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