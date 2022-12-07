import {Model} from "objection";

import {Feedbacks} from "@/database/models/feedbacks/feedbacks";


class FeedbacksTypes extends Model{
  static get tableName() {
    return "feedbacks_types";
  };

  static get idColumn() {
    return "feedback_type_id";
  }

  static relationMappings = {
    feedbacks: {
      relation: Model.HasManyRelation,
      modelClass: Feedbacks,
      join: {
        from: 'feedbacks_types.feedback_type_id',
        to: 'feedbacks.feedback_type'
      }
    }
  }
}

export {FeedbacksTypes}