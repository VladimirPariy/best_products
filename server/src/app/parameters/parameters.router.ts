import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import ParametersController from "@/app/parameters/parameters.controller";

export const createParametersRouter = (): Router => {
  const parametersRouter = Router();

  parametersRouter.get(
    EndpointsList.PARAMETERS_BY_SUBCATEGORY_ID,
    ParametersController.getParametersBySubcategoryId
  );

  return parametersRouter;
};
