import {Response, Request, NextFunction} from "express";
import AuthModel from "./auth.model";
import {HttpException} from "../middleware/exceptions";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const {login, email, password} = req.body;
    const data = await AuthModel.registration(login, email, password);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {login, email, password} = req.body;
    const data = await AuthModel.login(login, email, password);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new AuthController();
