import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import ParametersController from "@/app/parameters/parameters.controller";
import { checkRole } from "@/app/common/middlewares/role-middleware";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";

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
