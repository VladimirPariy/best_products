import {Router} from "express";
import UserController from "@/app/user/user.controller";
import {checkRole} from "@/app/middlewares/role-middleware";

export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get("/all",);
  userRouter.get("/:id",);
  userRouter.patch('/info/:id', [checkRole('2')], UserController.updateUserInfo)


  return userRouter;
};
