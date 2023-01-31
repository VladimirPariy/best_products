import bcrypt from "bcryptjs";
import { Request } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { RolesModel } from "./models/roles.model";
import { generateJwtToken } from "../common/utils/generate-jwt-token";
import { HttpException } from "../common/errors/exceptions";
import { IUserUpdatingFields } from "./user.interfaces";
import { UsersModel } from "./models/users.model";

class UserService {
  async getAllUsers() {
    const users = await UsersModel.query().withGraphFetched("users_roles");
    if (!Object.keys(users)) {
      return HttpException.internalServErr("Unsuccessful users request");
    }
    return users;
  }

  async getRoles() {
    const roles = await RolesModel.query();
    if (!roles.length) {
      return HttpException.internalServErr("Unsuccessful roles request");
    }
    return roles;
  }

  async updateUserRoleById(user_id: number, role: number) {
    const updatedUser = await UsersModel.query()
      .findById(user_id)
      .update({ role });
    if (!updatedUser) {
      return HttpException.internalServErr("Role change request failed");
    }
    return await this.getUserById(user_id);
  }

  async getUserByEmailOrPhoneNumber(login: string) {
    const user = await UsersModel.query()
      .skipUndefined()
      .where({ email: login })
      .orWhere({ phone_number: login });
    return user[0];
  }

  async getUserById(id: number) {
    const user = await UsersModel.query()
      .findById(id)
      .withGraphFetched("users_roles");
    if (!user) {
      return HttpException.notFound(`User not found`);
    }
    return user;
  }

  async updateUserById(id: string, { body, files }: Request) {
    const allowedFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "phone_number",
      "is_get_update",
    ];
    let userInfo = {} as IUserUpdatingFields;
    for (const field in body) {
      if (allowedFields.includes(field)) {
        userInfo = { ...userInfo, [field]: body[field] };
      }
    }

    const img = files?.img;
    if (Array.isArray(img)) {
      return HttpException.badRequest("Attached array of pictures");
    }

    if (img) {
      const fileName = `${uuidv4()}.jpg`;
      await img.mv(path.resolve(__dirname, "..", "..", "static", fileName));
      userInfo = { ...userInfo, user_photo: fileName };
    }

    if (!Object.keys(userInfo).length) {
      return HttpException.badRequest("You missed fields for update");
    }

    if (userInfo.password) {
      userInfo.password = await bcrypt.hash(userInfo.password, 7);
    }

    if (userInfo.email || userInfo.phone_number) {
      const user = await UsersModel.query()
        .skipUndefined()
        .where({ email: userInfo.email })
        .orWhere({ phone_number: userInfo.phone_number });
      if (user.length > 0) {
        return HttpException.alreadyExists(
          "User with the same email or phone exist"
        );
      }
    }

    const updateInfo = await UsersModel.query()
      .patch(userInfo)
      .where({ user_id: +id });
    if (!updateInfo) {
      return HttpException.internalServErr(`Unsuccessful updating user`);
    }
    return "Successful updated user";
  }

  async createNewToken(id: number) {
    const user = await this.getUserById(id);
    if (user instanceof HttpException) {
      return user;
    }
    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      return HttpException.internalServErr(
        `Unsuccessful attempt to create token`
      );
    }
    return token;
  }

  async removeOneById(id: number) {
    const user = await UsersModel.query().findById(id);
    if (user) {
      await user.$relatedQuery("users_views").delete();
      await user.$relatedQuery("users_favorite").delete();
      await user.$relatedQuery("users_comments").delete();
      await user.$relatedQuery("users_feedback").delete();
      await user.$query().delete();
    } else {
      return HttpException.notFound(`User not found`);
    }
    return { userId: id };
  }
}

export default new UserService();
