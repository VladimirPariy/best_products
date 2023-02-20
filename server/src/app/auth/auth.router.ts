import { Router } from "express";
import AuthController from "./auth.controller";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { tryCatch } from "../common/utils/try-catch";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  const instanceAuthController = AuthController.getInstance();

  authRouter.post("/registration", tryCatch(instanceAuthController.registration));
  authRouter.post("/login", tryCatch(instanceAuthController.login));
  authRouter.get("/me", authenticateJWT, tryCatch(instanceAuthController.check));

  return authRouter;
};
