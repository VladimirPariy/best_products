import { Response, Request } from "express";

import UserService from "./user.service";
import { HttpException } from "../common/errors/exceptions";
import { paramsSchema } from "../common/validations/params-validation";
import { roleSchema } from "../common/validations/role-validation";
import { IUserUpdatingFields } from "./user.interfaces";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "../common/validations/update-user-validation";
import { generateJwtToken } from "../common/utils/generate-jwt-token";

const instanceUserService = UserService.getInstance();

export default class UserController {
  private static instance: UserController;

  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async getAllUsers(req: Request, res: Response) {
    const data = await instanceUserService.getAllUsers();
    res.status(200).send(data);
  }

  async getAllRoles(req: Request, res: Response) {
    const data = await instanceUserService.getRoles();
    res.status(200).send(data);
  }

  async getUserInfo(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.user);
    const data = await instanceUserService.getUserById(id);
    res.status(200).send(data);
  }

  async updateUserInfo(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.user);

    const img = req.file;
    let body: Partial<IUserUpdatingFields> = { ...req.body };
    if (img) {
      body = { ...body, user_photo: img.filename };
    }

    const payload = await updateUserSchema.validate(body);
    if (payload.password) payload.password = await bcrypt.hash(payload.password, 7);

    if (payload.email || payload.phone_number) {
      const user = await instanceUserService.findUserByEmailOrPhoneNumber(payload.email, payload.phone_number);
      if (user.length > 0) throw HttpException.alreadyExists("User with the same email or phone exist");
    }

    const patchedUserAmount = await instanceUserService.updateUserById(id, payload);

    if (!patchedUserAmount) throw HttpException.internalServErr(`Unsuccessful updating user`);

    res.status(200).send({
      userId: id,
      patchedFields: payload,
      status: "Successful patched",
      amount: patchedUserAmount,
    });
  }

  async getNewToken(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.user);

    const user = await instanceUserService.getUserById(id);
    if (!user) throw HttpException.internalServErr(`User not found`);

    const token = generateJwtToken(user.user_id, user.email, user.role);
    if (!token) throw HttpException.internalServErr(`Unsuccessful attempt to create token`);

    res.status(200).send(token);
  }

  async updateRole(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);
    const { role } = await roleSchema.validate(req.body);

    const updatedUser = await instanceUserService.updateUserRoleById(id, role);
    if (!updatedUser) throw HttpException.internalServErr("Role change request failed");

    const user = await instanceUserService.getUserById(id);

    res.status(200).send(user);
  }

  async removeUser(req: Request, res: Response) {
    const { id } = await paramsSchema.validate(req.params);

    const data = await instanceUserService.removeOneById(+id);
    res.status(200).send({ userId: id, amountUserRemoved: data });
  }
}
