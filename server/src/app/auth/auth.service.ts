import UserService from "@/app/user/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Model} from "objection";

import {Users} from "@/database/models/users/users";
import {HttpException} from "@/app/middlewares/exceptions-middleware";

const generateJwtToken = (id: string, email: string, role: number): string => {
  return jwt.sign({id, email, role}, process.env.SECRET || '', {expiresIn: '24h'})
}


class AuthService {


  async registration(firstName: string, lastName: string, email: string, password: string, isGetUpdate: boolean) {
    const candidate = await UserService.getUserByEmailOrPhoneNumber(email);
    if (candidate.length) {
      return new HttpException("User already exists", 409);
    }
    const encryptedPass = await bcrypt.hash(password, 7);

    const insertingData = await Users.query()
    .insert({
      email,
      password: encryptedPass,
      first_name: firstName,
      last_name: lastName,
      created_at: Model.knex().fn.now(),
      is_get_update: isGetUpdate,
      updated_at: Model.knex().fn.now()
    })

    const user = (await UserService.getUserById(insertingData.user_id))[0]

    const token = generateJwtToken(user.user_id, user.email, user.role)
    return {user, token}
  }

  async login(login: string, password: string) {
    const candidate = await UserService.getUserByEmailOrPhoneNumber(login);
    if (!candidate.length) {
      return new HttpException("User is not found", 404);
    }

    const validPassword = bcrypt.compareSync(password, candidate[0].password);
    if (!validPassword) {
      return new HttpException(`User inputted invalid password`, 400);
    }

    const user = (await UserService.getUserById(candidate[0].user_id))[0]
    const token = generateJwtToken(user.user_id, user.email, user.role);
    return {user, token}
  }


  async checkAuth(user: jwt.JwtPayload) {
    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) return new HttpException(`Unsuccessful attempt to create token`);
    return {token}
  }
}

export default new AuthService();
