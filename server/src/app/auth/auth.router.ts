import { Router } from "express";

import { EndpointsList } from "../common/enums/endpoints-list";
import AuthController from "./auth.controller";

import {
  signUpSchema,
  validatingSignUp,
} from "../common/validations/sign-up-validation";
import {
  signInSchema,
  validatingSignIn,
} from "../common/validations/sign-in-validation";
import { authenticateJWT } from "../common/middlewares/auth-middleware";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  authRouter.post(
    EndpointsList.SIGN_UP,
    validatingSignUp(signUpSchema),
    AuthController.registration
  );
  authRouter.post(
    EndpointsList.SIGN_IN,
    validatingSignIn(signInSchema),
    AuthController.login
  );
  authRouter.get(EndpointsList.AUTH, authenticateJWT, AuthController.check);

  return authRouter;
};
