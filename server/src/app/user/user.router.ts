import {Router} from "express";
import {EndpointsList} from "@/app/common/enums/endpoints-list";
import UserController from "@/app/user/user.controller";
import {checkRole} from "@/app/common/middlewares/role-middleware";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get(EndpointsList.ALL_USERS,);
  userRouter.get(EndpointsList.ONE_USER_BY_ID, [checkRole('2')], UserController.getUserInfo);
  userRouter.patch(EndpointsList.ONE_USER_BY_ID, [checkRole('2')], UserController.updateUserInfo)

  return userRouter;
};
