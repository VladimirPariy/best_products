import {Model} from "objection";

import {FeedbacksTypes} from "@/app/models/feedbacks/feedbacks-types";
import {ProductsModel} from "@/app/product/models/products.model";
import {UsersModel} from "@/app/user/models/users.model";


class Feedbacks extends Model {
  static get tableName() {
    return "feedbacks";
  };

  static get idColumn() {
    return ["user", "product"];
  }

  static relationMappings = {
    feedback_types: {
      relation: Model.HasOneRelation,
      modelClass: FeedbacksTypes,
      join: {
        from: "feedbacks.feedback_type",
        to: "feedbacks_types.feedback_type_id"
      }
    },
    users: {
      relation: Model.HasOneRelation,
      modelClass: UsersModel,
      join: {
        from: "feedbacks.user",
        to: "users.user_id"
      }
    },
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "feedbacks.product",
        to: "products.product_id"
      }
    }
  }
}


export {Feedbacks};