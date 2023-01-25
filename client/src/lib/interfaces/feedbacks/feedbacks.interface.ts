import { IDataForChangeProduct } from "lib/interfaces/products/data-for-change-product";

export interface IFeedback {
  product: number;
  feedback_type: number;
  created_at: string;
  updated_at: string;
}

export interface IDataForAddFeedback extends IDataForChangeProduct {
  feedbackType: number;
}
