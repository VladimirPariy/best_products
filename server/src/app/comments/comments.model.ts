import Objection, { Model } from "objection";

import { UsersModel } from "@/app/users/models/users.model";

export class CommentsModel extends Model {
  comment_id: number;
  user: number;
  product: number;
  comment_msg: string;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

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
        to: "users.user_id",
      },
    },
    // products: {
    //   relation: Model.HasOneRelation,
    //   modelClass: ProductsModel,
    //   join: {
    //     from: "comments.product",
    //     to: "products.product_id"
    //   }
    // }
  };

  $beforeInsert() {
    this.created_at = CommentsModel.fn.now();
    this.updated_at = CommentsModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = CommentsModel.fn.now();
  }
}
