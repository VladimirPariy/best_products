import { Response, Request } from "express";
import bcrypt from "bcryptjs";

import UserService from "../users/user.service";

import { signUpSchema } from "../common/validations/sign-up-validation";
import { signInSchema } from "../common/validations/sign-in-validation";
import { tryCatch } from "../common/utils/try-catch";
import { HttpException } from "../common/errors/exceptions";
import { generateJwtToken } from "../common/utils/generate-jwt-token";

export default class AuthController {
  private static instance: AuthController;

  private constructor() {}

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }

    return AuthController.instance;
  }

  registration = tryCatch(async (req: Request, res: Response) => {
    const payload = await signUpSchema.validate(req.body).catch((e) => {
      throw HttpException.badRequest(e.errors[0]);
    });

    const { firstName, lastName, email, password, isGetUpdate } = payload;

    const candidate = await UserService.getUserByEmailOrPhoneNumber(email);
    if (candidate) throw HttpException.alreadyExists("User already exists");

    const encryptedPass = await bcrypt.hash(password, 7);
    const newUser = await UserService.createUser({ firstName, lastName, email, encryptedPass, isGetUpdate });

    const user = await UserService.getUserById(+newUser.user_id);
    if (!user) throw HttpException.internalServErr(`User not found`);

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) throw HttpException.internalServErr(`Unsuccessful attempt to create token`);

    res.status(200).send(token);
  });

  login = tryCatch(async (req: Request, res: Response) => {
    const payload = await signInSchema.validate(req.body).catch((e) => {
      throw HttpException.badRequest(e.errors[0]);
    });
    const { login, password } = payload;

    const candidate = await UserService.getUserByEmailOrPhoneNumber(login);
    if (!candidate) throw HttpException.notFound("User is not found");

    const validPassword = bcrypt.compareSync(password, candidate.password);
    if (!validPassword) throw HttpException.badRequest(`User inputted invalid password`);

    const token = generateJwtToken(candidate.user_id, candidate.email, candidate.role);
    if (!token) throw HttpException.internalServErr(`Unsuccessful attempt to create token`);

    res.status(200).send(token);
  });

  check = tryCatch(async (req: Request, res: Response) => {
    const user = req.user;

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) throw HttpException.internalServErr(`Unsuccessful attempt to create token`);

    res.status(200).send(token);
  });
}
