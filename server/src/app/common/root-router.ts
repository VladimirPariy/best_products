import {createAuthRouter} from "@/app/auth/auth.router";
import {EndpointsList} from "@/app/common/enums/endpoints-list";
import {createUserRouter} from "@/app/user/user.router";
import {Router} from "express";


export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use(EndpointsList.ROOT_AUTH, createAuthRouter());
  rootRouter.use(EndpointsList.ROOT_USER, createUserRouter())

  return rootRouter;
};
