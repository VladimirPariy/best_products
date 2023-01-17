import { IUser } from "lib/interfaces/user/user.interface";

type ShortUser =
  | "user_id"
  | "first_name"
  | "last_name"
  | "email"
  | "user_photo"
  | "updated_at"
  | "created_at";

export interface ShotCommentsWithUser {
  comment_id: number;
  comment_msg: string;
  created_at: string;
  updated_at: string;
  users: Pick<IUser, ShortUser>;
}
