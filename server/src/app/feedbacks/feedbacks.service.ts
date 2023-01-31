import { FeedbacksModel } from "./models/feedbacks.model";

class FeedbacksService {
  getFeedbacks(condition: { user?: number; product?: number }) {
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
      .where(condition);
  }

  async getFeedbacksByUserId(userId: number) {
    return this.getFeedbacks({ user: userId });
  }

  async addFeedback(userId: number, productId: number, feedbackType: number) {
    const feedbackId = feedbackType === 0 ? 1 : 2;
    const feedbackInsert = await FeedbacksModel.query().insert({
      user: userId,
      product: productId,
      feedback_type: feedbackId,
    });
    const feedback = await this.getFeedbacks({
      user: feedbackInsert.user,
      product: feedbackInsert.product,
    });
    return feedback[0];
  }
}

export default new FeedbacksService();
