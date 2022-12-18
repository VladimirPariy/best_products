import bcrypt from "bcryptjs";
import {Request} from "express";
import path from "path";
import {v4 as uuidv4} from "uuid";

import {generateJwtToken} from "@/app/common/utils/generate-jwt-token";
import {HttpException} from "@/app/common/errors/exceptions";
import {IUserUpdatingFields} from "@/app/user/user-updating-fields.interface";
import {UsersModel} from "@/app/user/models/users.model";


class UserService {


  async getUserByEmailOrPhoneNumber(login: string) {
    return UsersModel.query()
    .skipUndefined()
    .where({email: login})
    .orWhere({phone_number: login});
  }


  async getUserById(id: string) {
    return UsersModel.query()
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


  async selectUserByIdAndCreateToken(id: string) {
    const user = (await this.getUserById(`${id}`))[0]
    if (!user) {
      return HttpException.notFound(`User not found`);
    }

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      return HttpException.internalServErr(`Unsuccessful attempt to create token`);
    }

    return {user, token}
  }


  async updateUserById(id: string, {body, files}: Request) {
    // Валидация полей. Любые не предусмотренные - будут отброшены.
    const allowedFields = ['first_name', 'last_name', 'email', 'password', 'phone_number', 'is_get_update']
    let userInfo = {} as IUserUpdatingFields;
    for (const field in body) {
      if (allowedFields.includes(field)) {
        userInfo = {...userInfo, [field]: body[field]}
      }
    }

    const img = files?.img
    if (Array.isArray(img)) {
      return HttpException.badRequest('Attached array of pictures')
    }

    if (img) {
      const fileName = `${uuidv4()}.jpg`
      await img.mv(path.resolve(__dirname, "..", "..", "static", fileName))
      userInfo = {...userInfo, user_photo: fileName}
    }


    if (userInfo.password) {
      userInfo.password = await bcrypt.hash(userInfo.password, 7);
    }

    const updateInfo = await UsersModel.query().patch(userInfo).where({user_id: +id});

    if (!updateInfo) {
      return HttpException.internalServErr(`Unsuccessful updating user`);
    }

    return 'Successful updated user'
  }
}

export default new UserService();