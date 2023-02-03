import { Router } from "express";
import UserController from "./user.controller";
import { checkRole } from "../common/middlewares/role-middleware";
import { Roles } from "../common/enums/Roles";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get("/", [checkRole(Roles.Admin)], UserController.getAllUsers);
  userRouter.get("/roles", [checkRole(Roles.Admin)], UserController.getAllRoles);
  userRouter.patch("/roles/:id", [checkRole(Roles.Admin)], UserController.updateRole);
  userRouter.get("/:id", UserController.getUserInfo);
  userRouter.patch("/:id", UserController.updateUserInfo);
  userRouter.delete("/:id", [checkRole(Roles.Admin)], UserController.removeUser);
  userRouter.get("/token/:id", UserController.getNewToken);

  return userRouter;
};
