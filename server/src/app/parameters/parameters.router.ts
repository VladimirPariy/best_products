import { Router } from "express";
import ParametersController from "../parameters/parameters.controller";
import { checkRole } from "../common/middlewares/role-middleware";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { Roles } from "../common/enums/Roles";
import { tryCatch } from "../common/utils/try-catch";

export const createParametersRouter = (): Router => {
  const parametersRouter = Router();

  const instanceParametersController = ParametersController.getInstance();

  parametersRouter.get(
    "/",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceParametersController.getAllParameters)
  );
  parametersRouter.get("/:id", tryCatch(instanceParametersController.getParametersBySubcategoryId));

  return parametersRouter;
};
