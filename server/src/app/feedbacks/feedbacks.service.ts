import { FeedbacksModel } from "@/app/feedbacks/models/feedbacks.model";

class FeedbacksService {
  async getFeedbacksByUserId(userId: number) {
    return FeedbacksModel.query()
      .select([
        "feedbacks.product",
        "feedbacks.created_at",
        "feedbacks.updated_at",
        "feedbacks_types.type as feedback_type",
      ])
      .leftOuterJoin(
        "feedbacks_types",
        "feedbacks.feedback_type",
        "feedbacks_types.feedback_type_id"
      )
      .where({ user: userId });
  }
}

export default new FeedbacksService();
