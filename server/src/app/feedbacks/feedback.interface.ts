import { Feedback } from "../common/enums/Feedback";

export interface IDataForAddFeedback {
  userId: number;
  productId: number;
  feedbackId: Feedback;
}
