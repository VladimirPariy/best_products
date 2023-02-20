import { Router } from "express";
import UserController from "./user.controller";
import { checkRole } from "../common/middlewares/role-middleware";
import { Roles } from "../common/enums/Roles";
import { tryCatch } from "../common/utils/try-catch";
import { upload } from "../common/middlewares/multer";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  const instanceUserController = UserController.getInstance();

  userRouter.get("/", [checkRole(Roles.Admin)], tryCatch(instanceUserController.getAllUsers));
  userRouter.get("/roles", [checkRole(Roles.Admin)], tryCatch(instanceUserController.getAllRoles));
  userRouter.patch(
    "/roles/:id",
    [checkRole(Roles.Admin)],
    tryCatch(instanceUserController.updateRole)
  );
  userRouter.get("/:id", tryCatch(instanceUserController.getUserInfo));
  userRouter.patch("/:id", upload.single("img"), tryCatch(instanceUserController.updateUserInfo));
  userRouter.delete("/:id", [checkRole(Roles.Admin)], tryCatch(instanceUserController.removeUser));
  userRouter.get("/token/:id", tryCatch(instanceUserController.getNewToken));

  return userRouter;
};
