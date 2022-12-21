import {Model} from "objection";

import {FeedbacksModel} from "@/app/models/feedbacks/feedbacks.model";


class FeedbacksTypesModel extends Model {
  static get tableName() {
    return "feedbacks_types";
  };

  static get idColumn() {
    return "feedback_type_id";
  }

  static relationMappings = {
    feedbacks: {
      relation: Model.HasManyRelation,
      modelClass: FeedbacksModel,
      join: {
        from: 'feedbacks_types.feedback_type_id',
        to: 'feedbacks.feedback_type'
      }
    }
  }
}

export {FeedbacksTypesModel}