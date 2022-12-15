import {generateJwtToken} from "@/app/auth/auth.service";
import {HttpException} from "@/app/common/errors/exceptions";
import {IUserUpdatingFields} from "@/app/lib/interfaces/user-updating-fields.interface";
import {Users} from "@/database/models/users/users";
import bcrypt from "bcryptjs";

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
    let updatedFields = {...fields}
    console.log(updatedFields)
    if (updatedFields.password) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 7);
    }
    console.log(updatedFields)
    const isUpdate = await Users.query().patch(updatedFields).where({user_id: id});
    if (!isUpdate) {
      return HttpException.internalServErr(`Unsuccessful updating user`);
    }
    const user = (await this.getUserById(`${id}`))[0]

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) return HttpException.internalServErr(`Unsuccessful attempt to create token`);

    return {user, token}

  }
}

export default new UserService();