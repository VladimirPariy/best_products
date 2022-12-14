import {Users} from "@/database/models/users/users";

class UserService {
  async getUserByEmailOrPhoneNumber(login: string) {
    return Users.query()
    .skipUndefined()
    .where({email: login})
    .orWhere({phone_number: login});
  }

  async getUserById(id: string) {
    return Users.query()
    .select([
      'user_id',
      'first_name',
      'last_name',
      'email',
      'password',
      'phone_number',
      'user_photo',
      'is_get_update',
      'created_at',
      'updated_at',
      'roles.role_title as role'
    ])
    .join("roles", "users.role", "roles.role_id")
    .where('user_id', '=', id)
  }


}

export default new UserService();