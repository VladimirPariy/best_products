import { Router } from "express";

import CategoriesController from "./categories.controller";
import { EndpointsList } from "../common/enums/endpoints-list";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();

  categoriesRouter.get(
    EndpointsList.CATEGORIES_WITH_SUBCATEGORIES,
    CategoriesController.getAll
  );

  return categoriesRouter;
};
