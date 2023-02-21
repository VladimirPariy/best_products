import Objection, { Model } from "objection";
import { FeedbacksTypesModel } from "./feedbacks-types.model";
import { ProductsModel } from "../../products/models/products.model";
import { UsersModel } from "../../users/models/users.model";

export class FeedbacksModel extends Model {
  user: number;
  product: number;
  feedback_type: number;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "feedbacks";
  }

  static get idColumn() {
    return ["user", "product"];
  }

  static get relationMappings() {
    return {
      feedback_types: {
        relation: Model.HasOneRelation,
        modelClass: FeedbacksTypesModel,
        join: {
          from: "feedbacks.feedback_type",
          to: "feedbacks_types.feedback_type_id",
        },
      },
      users: {
        relation: Model.HasOneRelation,
        modelClass: UsersModel,
        join: {
          from: "feedbacks.user",
          to: "users.user_id",
        },
      },
      products: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "feedbacks.product",
          to: "products.product_id",
        },
      },
    };
  }

  $beforeInsert() {
    this.created_at = FeedbacksModel.fn.now();
    this.updated_at = FeedbacksModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = FeedbacksModel.fn.now();
  }
}
