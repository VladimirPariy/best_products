import {Response, Request, NextFunction} from "express";

import {userUpdatingField} from "@/app/lib/utils/user-updating-field";
import UserService from "@/app/user/user.service";
import {HttpException} from "@/app/common/errors/exceptions";
import {v4 as uuidv4} from 'uuid'


class UserController {

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(HttpException.badRequest(`User\`s id not specified`));
    }

    // Валидация полей. Любые не предусмотренные - будут отброшены.
    const fields = userUpdatingField(req);
    if (!Object.keys(fields).length) {
      return next(HttpException.badRequest(`No fields allowed to update`));
    }

    const data = await UserService.updateUserById(+id, fields)

    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async updateUserPhoto(req: Request, res: Response, next: NextFunction) {
    const img = req.files
    console.log(img)
    let fileName: string | null = null;
    // if() fileName = `${uuidv4()}.jpg`
  }
}

export default new UserController();