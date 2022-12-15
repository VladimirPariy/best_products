import {IUserUpdatingFields} from "@/app/lib/interfaces/user-updating-fields.interface";
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
      'role',
      'roles.role_title as role_name'
    ])
    .join("roles", "users.role", "roles.role_id")
    .where('user_id', '=', id)
  }

  async updateUserById(id: number, fields: IUserUpdatingFields) {
    return Users.query().patchAndFetchById(id, fields);
  }
}

export default new UserService();