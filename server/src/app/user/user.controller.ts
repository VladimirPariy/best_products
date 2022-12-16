import {Response, Request, NextFunction} from "express";

import {userUpdatingField} from "@/app/lib/utils/user-updating-field";
import UserService from "@/app/user/user.service";
import {HttpException} from "@/app/common/errors/exceptions";
import * as path from "path";
import {v4 as uuidv4} from 'uuid'


class UserController {

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(HttpException.badRequest(`User\`s id not specified`));
    }

    const img = req.files?.img
    if (Array.isArray(img)) return next(HttpException.badRequest('Attached array of pictures'))

    const data = await UserService.updateUserById(id, req, img)

    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }


}

export default new UserController();