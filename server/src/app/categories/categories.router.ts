import CategoriesController from "@/app/categories/categories.controller";
import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();

  categoriesRouter.get(EndpointsList.GET_ALL_CATEGORIES, CategoriesController.getAll);

  return categoriesRouter;
};