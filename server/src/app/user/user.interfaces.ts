export interface IUserUpdatingFields {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  phone_number?: string
  is_get_update?: boolean
  user_photo?: string
}


export interface IUserComment {
  comment_id: number;
  comment_msg: string;
  user: number;
  product: number;
}

export interface IUserFeedback {
  user: number;
  product: number;
  feedback_type: number;
}

export interface IUserFavorite {
  user: number;
  product: number;
}

export interface IUserView {
  user: number;
  product: number;
  view_id: number;
}