export interface IUserUpdateData {
  [key: string]: string | boolean | number | File | null | undefined;

  id: number;
  token?: string;

  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  is_get_update?: number;
  user_photo?: File | null;
}
