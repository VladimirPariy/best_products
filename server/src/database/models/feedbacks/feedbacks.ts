import {Model} from "objection";

import {FeedbacksTypes} from "@/database/models/feedbacks/feedbacks-types";
import {Products} from "@/database/models/products/products";
import {Users} from "@/database/models/users/users";


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
      modelClass: Users,
      join: {
        from: "feedbacks.user",
        to: "users.user_id"
      }
    },
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "feedbacks.product",
        to: "products.product_id"
      }
    }
  }
}


export {Feedbacks};