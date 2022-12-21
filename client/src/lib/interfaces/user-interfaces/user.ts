export interface IRole {
  role_id: number
  role_title: string
}

export interface IUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string | null;
  user_photo: string | null;
  is_get_update: number;
  created_at: string;
  updated_at: string;
  role: number;
  users_roles: IRole
}

