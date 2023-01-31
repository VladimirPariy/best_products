import { Response, Request, NextFunction } from "express";

import AuthService from "./auth.service";

import { HttpException } from "../common/errors/exceptions";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password, isGetUpdate } = req.body;
    const data = await AuthService.registration(
      firstName,
      lastName,
      email,
      password,
      isGetUpdate
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    const data = await AuthService.login(login, password);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async check(req: Request, res: Response, next: NextFunction) {
    const data = await AuthService.checkAuth(req.user);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new AuthController();
