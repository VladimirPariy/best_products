import {Model} from "objection";

import {ProductsModel} from "@/app/product/models/products.model";
import {UsersModel} from "@/app/user/models/users.model";


class CommentsModel extends Model {
  static get tableName() {
    return "comments";
  }

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
    // products: {
    //   relation: Model.HasOneRelation,
    //   modelClass: ProductsModel,
    //   join: {
    //     from: "comments.product",
    //     to: "products.product_id"
    //   }
    // }
  }
}

export {CommentsModel};