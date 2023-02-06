import { FeedbacksModel } from "./models/feedbacks.model";
import { Feedback } from "../common/enums/Feedback";
import { IDataForAddFeedback } from "./feedback.interface";

export default class FeedbacksService {
  private static instance: FeedbacksService;

  private constructor() {}

  public static getInstance(): FeedbacksService {
    if (!FeedbacksService.instance) {
      FeedbacksService.instance = new FeedbacksService();
    }
    return FeedbacksService.instance;
  }

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

  async getFeedbackByUserAndProductID(user: number, product: number) {
    const feedback = await this.getFeedbacks({
      user,
      product,
    });
    return feedback[0];
  }

  async addFeedback(data: IDataForAddFeedback) {
    const { userId, productId, feedbackType } = data;
    const feedbackId = feedbackType ? Feedback.Positive : Feedback.Negative;
    return FeedbacksModel.query().insert({
      user: userId,
      product: productId,
      feedback_type: feedbackId,
    });
  }
}
