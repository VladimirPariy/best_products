import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import ParametersController from "../parameters/parameters.controller";
import { checkRole } from "../common/middlewares/role-middleware";
import { authenticateJWT } from "../common/middlewares/auth-middleware";

export const createParametersRouter = (): Router => {
  const parametersRouter = Router();

  parametersRouter.get(
    EndpointsList.PARAMETERS,
    [checkRole("1"), authenticateJWT],
    ParametersController.getAllParameters
  );
  parametersRouter.get(
    EndpointsList.PARAMETERS_BY_SUBCATEGORY_ID,
    ParametersController.getParametersBySubcategoryId
  );

  return parametersRouter;
};
