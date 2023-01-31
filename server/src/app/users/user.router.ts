import { Router } from "express";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { EndpointsList } from "../common/enums/endpoints-list";
import UserController from "./user.controller";
import { checkRole } from "../common/middlewares/role-middleware";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get(
    EndpointsList.ALL_USERS,
    [checkRole("1"), authenticateJWT],
    UserController.getAllUsers
  );
  userRouter.get(
    EndpointsList.ROLE_LIST,
    [checkRole("1"), authenticateJWT],
    UserController.getAllRoles
  );
  userRouter.patch(
    EndpointsList.ROLE_BY_USER_ID,
    [checkRole("1"), authenticateJWT],
    UserController.updateRole
  );
  userRouter.get(
    EndpointsList.ONE_USER_BY_ID,
    authenticateJWT,
    UserController.getUserInfo
  );
  userRouter.patch(
    EndpointsList.ONE_USER_BY_ID,
    authenticateJWT,
    UserController.updateUserInfo
  );
  userRouter.delete(
    EndpointsList.ONE_USER_BY_ID,
    [checkRole("1"), authenticateJWT],
    UserController.removeUser
  );
  userRouter.get(
    EndpointsList.TOKEN_BY_USER_ID,
    authenticateJWT,
    UserController.getNewToken
  );

  return userRouter;
};
