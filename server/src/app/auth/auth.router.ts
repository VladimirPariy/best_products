import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";
import AuthController from "@/app/auth/auth.controller";
import {signUpSchema, validatingSignUp,} from "@/app/common/validations/sign-up-validation";
import {signInSchema, validatingSignIn} from "@/app/common/validations/sign-in-validation";
import {authenticateJWT} from "@/app/common/middlewares/auth-middleware";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  authRouter.post(EndpointsList.SIGN_UP, validatingSignUp(signUpSchema), AuthController.registration);
  authRouter.post(EndpointsList.SIGN_IN, validatingSignIn(signInSchema), AuthController.login);
  authRouter.get(EndpointsList.ME, authenticateJWT, AuthController.check)

  return authRouter;
};
