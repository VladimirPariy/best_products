import {userUpdatingField} from "@/app/lib/utils/user-updating-field";
import UserService from "@/app/user/user.service";
import {Response, Request, NextFunction} from "express";
import {HttpException} from "@/app/middlewares/exceptions-middleware";
import {Model} from "objection";
import knex, {Knex} from "knex";
import {Users} from "@/database/models/users/users";


class UserController {

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!id) {
      return next(new HttpException(`User\`s id not specified`, 400));
    }

    // Валидация на редактируемые поля. Любые не предусмотренные - будут отброшены.
    const fields = userUpdatingField(req);
    if (!Object.keys(fields).length) {
      return next(new HttpException(`No fields allowed to update`, 400));
    }

    const data = await UserService.updateUserById(+id, fields)
    res.status(200).send(data);
  }
}

export default new UserController();