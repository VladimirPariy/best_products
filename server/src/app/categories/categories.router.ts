import { Router } from "express";

import CategoriesController from "@/app/categories/categories.controller";
import { EndpointsList } from "@/app/common/enums/endpoints-list";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();

  categoriesRouter.get(
    EndpointsList.CATEGORIES_WITH_SUBCATEGORIES,
    CategoriesController.getAll
  );
  // categoriesRouter.get(EndpointsList.SUBCATEGORIES, CategoriesController.getAllSubcategory)

  return categoriesRouter;
};
