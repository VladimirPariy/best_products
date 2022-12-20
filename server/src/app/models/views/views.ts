import {Model} from "objection";

import {ProductsModel} from "@/app/product/models/products.model";
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
      modelClass: ProductsModel,
      join: {
        from: "views.product",
        to: "products.product_id"
      }
    }
  }
}

export {Views};