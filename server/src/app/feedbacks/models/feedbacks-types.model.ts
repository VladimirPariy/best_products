import {Model} from "objection";

import {FeedbacksModel} from "@/app/feedbacks/models/feedbacks.model";


class FeedbacksTypesModel extends Model {
	
	feedback_type_id:number;
	// in project using positive and negative feedback types (0 - negative; 1 - positive)
	type:number;
	
  static get tableName() {
    return "feedbacks_types";
  }

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