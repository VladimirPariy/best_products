import {Router} from "express";

import AuthController from "@/app/auth/auth.controller";
import {signUpSchema, validatingSignUp,} from "@/app/middlewares/validation/sign-up-validation";
import {signInSchema, validatingSignIn} from "@/app/middlewares/validation/sign-in-validation";
import {authenticateJWT} from "@/app/middlewares/auth-middleware";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  authRouter.post("/registration", validatingSignUp(signUpSchema), AuthController.registration);
  authRouter.post("/login", validatingSignIn(signInSchema), AuthController.login);
  authRouter.get("/auth", authenticateJWT, AuthController.check)

  return authRouter;
};
