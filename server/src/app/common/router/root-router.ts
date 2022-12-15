import {createAuthRouter} from "@/app/auth/auth.router";
import {createUserRouter} from "@/app/user/user.router";
import {Router} from "express";


export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use("/auth", createAuthRouter());
  rootRouter.use("/user", createUserRouter())

  return rootRouter;
};
