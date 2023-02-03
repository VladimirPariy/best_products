import { Router } from "express";

import AuthController from "./auth.controller";

import { authenticateJWT } from "../common/middlewares/auth-middleware";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  const instanceAuthController = AuthController.getInstance();

  authRouter.post("/registration", instanceAuthController.registration);
  authRouter.post("/login", instanceAuthController.login);
  authRouter.get("/me", authenticateJWT, instanceAuthController.check);

  return authRouter;
};
