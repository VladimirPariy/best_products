import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserService from "@/app/users/user.service";
import { UsersModel } from "@/app/users/models/users.model";
import { HttpException } from "@/app/common/errors/exceptions";
import { generateJwtToken } from "@/app/common/utils/generate-jwt-token";

class AuthService {
  async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isGetUpdate: boolean
  ) {
    const candidate = await UserService.getUserByEmailOrPhoneNumber(email);
    if (candidate) {
      return HttpException.alreadyExists("User already exists");
    }
    const encryptedPass = await bcrypt.hash(password, 7);

    const insertingData = await UsersModel.query().insert({
      email,
      password: encryptedPass,
      first_name: firstName,
      last_name: lastName,
      is_get_update: isGetUpdate,
    });

    const user = await UserService.getUserById(+insertingData.user_id);
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

  async login(login: string, password: string) {
    const candidate = await UserService.getUserByEmailOrPhoneNumber(login);
    if (!candidate) {
      return HttpException.notFound("User is not found");
    }

    const validPassword = bcrypt.compareSync(password, candidate.password);
    if (!validPassword) {
      return HttpException.badRequest(`User inputted invalid password`);
    }
    const token = generateJwtToken(
      candidate.user_id,
      candidate.email,
      candidate.role
    );
    if (!token) {
      return HttpException.internalServErr(
        `Unsuccessful attempt to create token`
      );
    }
    return token;
  }

  async checkAuth(user: jwt.JwtPayload) {
    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      return HttpException.internalServErr(
        `Unsuccessful attempt to create token`
      );
    }
    return token;
  }
}

export default new AuthService();
