import { Response, Request } from "express";
import bcrypt from "bcryptjs";

import UserService from "../users/user.service";

import { signUpSchema } from "../common/validations/sign-up-validation";
import { signInSchema } from "../common/validations/sign-in-validation";
import { HttpException } from "../common/errors/exceptions";
import { generateJwtToken } from "../common/utils/generate-jwt-token";

const instanceUserService = UserService.getInstance();

export default class AuthController {
  private static instance: AuthController;
  private constructor() {}
  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  async registration(req: Request, res: Response) {
    const payload = await signUpSchema.validate(req.body);

    const { firstName, lastName, email, password, isGetUpdate } = payload;

    const candidate = await instanceUserService.getUserByLogin(email);
    if (candidate) {
      throw HttpException.alreadyExists("User already exists");
    }

    const encryptedPass = await bcrypt.hash(password, 7);
    const newUser = await instanceUserService.createUser({
      firstName,
      lastName,
      email,
      encryptedPass,
      isGetUpdate,
    });

    const user = await instanceUserService.getUserById(+newUser.user_id);
    if (!user) throw HttpException.internalServErr(`User not found`);

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      throw HttpException.internalServErr(`Unsuccessful attempt to create token`);
    }

    res.status(200).send(token);
  }

  async login(req: Request, res: Response) {
    const payload = await signInSchema.validate(req.body);
    const { login, password } = payload;

    const candidate = await instanceUserService.getUserByLogin(login);
    if (!candidate) {
      throw HttpException.notFound("User is not found");
    }

    const validPassword = bcrypt.compareSync(password, candidate.password);
    if (!validPassword) {
      throw HttpException.badRequest(`User inputted invalid password`);
    }

    const token = generateJwtToken(candidate.user_id, candidate.email, candidate.role);
    if (!token) {
      throw HttpException.internalServErr(`Unsuccessful attempt to create token`);
    }

    res.status(200).send(token);
  }

  async check(req: Request, res: Response) {
    const user = req.user;

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) {
      throw HttpException.internalServErr(`Unsuccessful attempt to create token`);
    }
    res.status(200).send(token);
  }
}
