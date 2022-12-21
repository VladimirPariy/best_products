import {Model} from "objection";

import {FeedbacksTypesModel} from "@/app/models/feedbacks/feedbacks-types.model";
import {ProductsModel} from "@/app/product/models/products.model";
import {UsersModel} from "@/app/user/models/users.model";


class FeedbacksModel extends Model {
  static get tableName() {
    return "feedbacks";
  };

  static get idColumn() {
    return ["user", "product"];
  }

  static relationMappings = {
    feedback_types: {
      relation: Model.HasOneRelation,
      modelClass: FeedbacksTypesModel,
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


export {FeedbacksModel};