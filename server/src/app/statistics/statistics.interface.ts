export interface IProductAverageRating {
  product_id: number;
  product_title: string;
  positive_feedbacks_amount?: number;
  negative_feedbacks_amount?: number;
  averageRating: number;
}
