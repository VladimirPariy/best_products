import { Router } from "express";

import AuthController from "./auth.controller";
import {
  userSchema,
  validatingRegistration,
} from "../middleware/yup/validationRegistration";

export const createAuthRouter = (): Router => {
  const authRouter = Router();

  authRouter.post(
    "/registration",
    validatingRegistration(userSchema),
    AuthController.registration
  );
  authRouter.post("/login", AuthController.login);

  return authRouter;
};
