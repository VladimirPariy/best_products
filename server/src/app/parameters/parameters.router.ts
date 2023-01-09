import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import ParametersController from "@/app/parameters/parameters.controller";

export const createParametersRouter = (): Router => {
	const parametersRouter = Router();
	
	parametersRouter.get(EndpointsList.parametersBySubcategoryId, ParametersController.getParametersBySubcategoryId);

	
	return parametersRouter;
};
