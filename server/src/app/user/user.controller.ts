import {Response, Request, NextFunction} from "express";

import UserService from "@/app/user/user.service";
import {HttpException} from "@/app/common/errors/exceptions";


class UserController {

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(HttpException.badRequest(`User\`s id not specified`));
    }
    const data = await UserService.selectUserByIdAndCreateToken(id)
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }


  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(HttpException.badRequest(`User\`s id not specified`));
    }

    const data = await UserService.updateUserById(id, req)

    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new UserController();