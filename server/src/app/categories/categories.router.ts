import { Router } from "express";

import CategoriesController from "./categories.controller";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();

  categoriesRouter.get("/", CategoriesController.getAll);

  return categoriesRouter;
};
