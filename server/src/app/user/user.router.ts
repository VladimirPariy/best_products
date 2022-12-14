import {Router} from "express";


export const createUserRouter = (): Router => {
  const userRouter = Router();

  userRouter.get("/all",);
  userRouter.get("/one",);


  return userRouter;
};
