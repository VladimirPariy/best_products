export interface IStatisticsUsers {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: null | string;
  created_at: string;
}

export interface IStatisticsFavorites {
  product_id: number;
  product_title: string;
  favorites_amount: number;
}

export interface IStatisticsCommented {
  product_id: number;
  product_title: string;
  comments_amount: number;
}

export interface IStatisticsPopular {
  product_id: number;
  product_title: string;
  views_amount: number;
}

export interface IStatisticsRating {
  product_id: number;
  product_title: string;
  positive_feedbacks_amount: number;
  negative_feedbacks_amount: number;
  averageRating: number;
}
