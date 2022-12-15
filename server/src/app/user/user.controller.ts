import {userUpdatingField} from "@/app/lib/utils/user-updating-field";
import UserService from "@/app/user/user.service";
import {Response, Request, NextFunction} from "express";
import {HttpException} from "@/app/common/errors/exceptions";


class UserController {

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(HttpException.badRequest(`User\`s id not specified`));
    }

    // Валидация на редактируемые поля. Любые не предусмотренные - будут отброшены.
    const fields = userUpdatingField(req);
    if (!Object.keys(fields).length) {
      return next(HttpException.badRequest(`No fields allowed to update`));
    }

    const data = await UserService.updateUserById(+id, fields)
    res.status(200).send(data);
  }
}

export default new UserController();