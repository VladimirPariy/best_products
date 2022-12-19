import {authenticateJWT} from "@/app/common/middlewares/auth-middleware";
import UserService from "@/app/user/user.service";
import {Router} from "express";
import {EndpointsList} from "@/app/common/enums/endpoints-list";
import UserController from "@/app/user/user.controller";
import {checkRole} from "@/app/common/middlewares/role-middleware";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get(EndpointsList.ALL_USERS,);
  userRouter.get(EndpointsList.ONE_USER_BY_ID, authenticateJWT, UserController.getUserInfo);
  userRouter.patch(EndpointsList.ONE_USER_BY_ID, authenticateJWT, UserController.updateUserInfo)
  userRouter.get(EndpointsList.UPDATE_TOKEN, authenticateJWT, UserController.getNewToken)

  return userRouter;
};
