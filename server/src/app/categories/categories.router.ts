import { Router } from "express";
import CategoriesController from "./categories.controller";

export const createCategoriesRouter = (): Router => {
  const categoriesRouter = Router();
  const instanceCategoriesController = CategoriesController.getInstance();

  categoriesRouter.get("/", instanceCategoriesController.getAll);

  return categoriesRouter;
};
