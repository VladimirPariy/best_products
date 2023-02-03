import { Router } from "express";
import ParametersController from "../parameters/parameters.controller";
import { checkRole } from "../common/middlewares/role-middleware";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { Roles } from "../common/enums/Roles";

export const createParametersRouter = (): Router => {
  const parametersRouter = Router();

  parametersRouter.get("/", [checkRole(Roles.Admin), authenticateJWT], ParametersController.getAllParameters);
  parametersRouter.get("/:subcategoryId", ParametersController.getParametersBySubcategoryId);

  return parametersRouter;
};
