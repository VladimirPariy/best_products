import CategoriesController from "@/app/categories/categories.controller";
import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();

  categoriesRouter.get(EndpointsList.CATEGORIES, CategoriesController.getAll);

  return categoriesRouter;
};