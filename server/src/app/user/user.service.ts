import {RolesModel} from "@/app/user/models/roles.model";
import bcrypt from "bcryptjs";
import {Request} from "express";
import path from "path";
import {v4 as uuidv4} from "uuid";

import {generateJwtToken} from "@/app/common/utils/generate-jwt-token";
import {HttpException} from "@/app/common/errors/exceptions";
import {IUserUpdatingFields} from "@/app/user/user.interfaces";
import {UsersModel} from "@/app/user/models/users.model";


class UserService {

  async getAllUsers() {
    const users = await UsersModel.query().withGraphFetched('users_roles')
    if (!users.length) {
      return HttpException.internalServErr('Unsuccessful users request')
    }
    return users
  }

  async getRoles() {
    const roles = await RolesModel.query();
    if (!roles.length) {
      return HttpException.internalServErr('Unsuccessful roles request')
    }
    return roles
  }


  async getUserByEmailOrPhoneNumber(login: string) {
    const user = await UsersModel.query()
    .skipUndefined()
    .where({email: login})
    .orWhere({phone_number: login});
    return user[0]
  }


  async getUserById(id: string) {
    const user = await UsersModel.query().withGraphFetched('users_roles').where('user_id', '=', id)

    if (!user) {
      return HttpException.notFound(`User not found`);
    }

    return user[0]
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

// исправить (приходит обьекта, а не массив.
    const img = files?.img
    if (Array.isArray(img)) {
      return HttpException.badRequest('Attached array of pictures')
    }

    if (img) {
      const fileName = `${uuidv4()}.jpg`
      await img.mv(path.resolve(__dirname, "..", "..", "static", fileName))
      userInfo = {...userInfo, user_photo: fileName}
    }

    if (!Object.keys(userInfo).length) {
      return HttpException.badRequest('You missed fields for update')
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


  async createNewToken(id: string) {
    const user = await this.getUserById(id);
    if (user instanceof HttpException) {
      return user
    }
    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      return HttpException.internalServErr(`Unsuccessful attempt to create token`);
    }
    return token
  }


}

export default new UserService();